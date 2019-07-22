import {PubSub} from "./PubSub";

describe('PubSub', () => {
    const TOPIC = 'TEST';
    const data = 'Some data';

    it('action should called once with valid data', () => {
        const action = jest.fn();

        PubSub.subscribe(TOPIC, action);
        PubSub.publish(TOPIC, data);

        expect(action).toBeCalledTimes(1);
        expect(action).toBeCalledWith(data);
    });

    it('action should not de called (unsub fy token)', () => {
        const action = jest.fn();

        const token = PubSub.subscribe(TOPIC, action);
        PubSub.unsubscribe(token);
        PubSub.publish(TOPIC, data);

        expect(action).toBeCalledTimes(0);
    });

    it('action should not de called (unsub fy function)', () => {
        const action = jest.fn();

        PubSub.subscribe(TOPIC, action);
        PubSub.unsubscribe(action);
        PubSub.publish(TOPIC, data);

        expect(action).toBeCalledTimes(0);
    });

    it('actions should unsubscribes', () => {
        const actions = [];
        for(let i = 0; i < 3; ++i) {
            actions.push(jest.fn());
            PubSub.subscribe(TOPIC, actions[i]);
        }

        PubSub.publish(TOPIC, data);

        actions.forEach(action => expect(action).toBeCalledTimes(1));

        PubSub.clearAllSubscriptions();
        PubSub.publish(TOPIC, data);

        actions.forEach(action => expect(action).toBeCalledTimes(1));
    });
});