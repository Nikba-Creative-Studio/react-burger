const servUrl = 'http://localhost:3000/';

describe('Burger Constructor', () => {

    it('Сервер запускается по адресу localhost:3000', () => {
        cy.visit(servUrl)
    });
    
    it('перетаскивание ингредиента в конструктор', () => {
        const dataTransfer = new DataTransfer();
        
        // перетаскиваем Булку в конструктор
        cy.get('[data-test="60d3b41abdacab0026a733c7"]').trigger('dragstart', {
            dataTransfer
        })

        cy.get('[data-test="constructor"]').trigger('drop', {
            dataTransfer
        })

        // перетаскиваем ингредиент в конструктор
        cy.get('[data-test="60d3b41abdacab0026a733cc"]').trigger('dragstart', {
            dataTransfer
        })

        cy.get('[data-test="constructor"]').trigger('drop', {
            dataTransfer
        })

    });

    it('открытие модального окна с описанием ингредиента', () => {
        // Кликаем на ингредиент
        cy.get('[data-test="60d3b41abdacab0026a733c7"]').click('center');
        cy.get('[data-test="modal"]', {timeout: 20000}).should('exist');
    });

    it('отображение в модальном окне данных ингредиента', () => {
        
        cy.get('[data-test="ingredient-detail"] > img').should('have.attr', 'src', 'https://code.s3.yandex.net/react/code/bun-01-large.png');
        cy.get('[data-test="ingredient-detail"] > h3').should('have.text', 'Флюоресцентная булка R2-D3');
        cy.get('[data-test="modal-close"]').click('center');
    });
    
    it('открытие модального окна с данными о заказе при клике по кнопке «Оформить заказ»', () => {
        // Проверяем сумму ингредиентов в конструкторе
        cy.get('[data-test="total-price"]').should('contain', '1078')

        // Проверяем если кнопка активна
        cy.get('[data-test="send-order"] > button').should('be.enabled').should('contain.text', 'Оформить заказ');

        // Кликаем по кнопке оформить заказ
        cy.get('[data-test="send-order"] > button').click('center');

        // Переход на страницу авторизации
        cy.url().should('eq', `${servUrl}login`);

        // Вводим логин
        cy.get('input[name=email]').type('office@nikba.com');

        // Вводим пароль
        cy.get('input[name=password]').type('123123');
        
        // Кликаем по кнопке Войти
        cy.get('button').should('have.text', 'Войти').click();

        // Переход на страницу конструктора
        cy.url().should('eq', servUrl)

        // Проверяем если cookie записан
        cy.getCookie('accessToken').should('exist')

        // Кликаем по кнопке оформить заказ
        cy.get('[data-test="send-order"] > button').click('center');

        // Модалка открылась
        cy.get('[data-test="modal"]', {timeout: 20000}).should('exist');
    });

    it('закрытие модальных окон при клике на кнопку закрытия.', () => {
        // Закрываетм модалку
        cy.get('[data-test="modal-close"]').click('center');

        // Конструктор очищается
        cy.get('[data-test="total-price"]').should('contain', '0')
    });
});