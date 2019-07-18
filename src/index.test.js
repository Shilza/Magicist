import ReactDOM from "react-dom";
import {renderToDom} from "./index";

describe("test ReactDOM.render", () => {
    const originalRender = ReactDOM.render;
    const originalConsole = global.console.error;

    beforeEach(() => {
        ReactDOM.render = jest.fn();
        global.console.error = jest.fn();
    });

    afterAll(() => {
        ReactDOM.render = originalRender;
        console.error = originalConsole;
    });

    it("should call ReactDOM.render", () => {
        renderToDom(document.createElement('div'));

        expect(ReactDOM.render).toHaveBeenCalled();
    });

    it('should call console.error', () => {
        renderToDom();

        expect(ReactDOM.render).not.toHaveBeenCalled();
        expect(console.error).toHaveBeenCalled();
        expect(console.error).toBeCalledWith('root element is not defined');
    });
});
