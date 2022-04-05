import { AnyAction, Middleware, MiddlewareAPI } from 'redux';
import { wsConnectSuccess, wsGetOrders } from '../actions/feed';
import { getCookie } from '../../utils/helpers';
import { getUser } from '../actions/auth';
import { RootState } from '../../types/types'
import { AppDispatch } from '../../types';
import { TWsActions } from '../../types/feed';

export const socketMiddleware = (wsUrl: string, wsActions: TWsActions): Middleware => {
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
        
        let socket: WebSocket | null = null;
        let accessToken: string | undefined = undefined;
       
        return (next) => async (action: AnyAction) => {
            const { dispatch } = store;
            const { type } = action;
            const { wsFeedStart, wsFeedUserStart, onFeedClose, onFeedError } = wsActions;

            switch (type) {
                case wsFeedStart:
                    socket = new WebSocket(`${wsUrl}/all`);
                    break;

                case wsFeedUserStart:
                    accessToken = getCookie('accessToken'); 
                    if (accessToken) {
                        getUser();
                        socket = new WebSocket(`${wsUrl}?token=${accessToken.split(' ')[1]}`);   
                    }
                    break;
                case onFeedError:
                    socket = null;
                    break;
                    
            }

            if (socket) {
                socket.onopen = (event) => {
                    console.log('socket - открыт');
                    dispatch(wsConnectSuccess());
                };

                socket.onerror = (event) => {
                    console.log('socket - ошибка');
                    dispatch({ type: onFeedClose });
                };

                socket.onmessage = (event) => {
                    console.log('socket - сообщение');
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch(wsGetOrders(parsedData));
                };

                if (type === onFeedError) {
                    socket.close(1000, 'socket - закрыт при ошибке');
                }

                socket.onclose = (event) => {
                    console.log('socket - закрыт');
                    if (event.code !== 1000) {
                        console.log(event.code);
                    }
                };
            }

            next(action);
        };
    };
};