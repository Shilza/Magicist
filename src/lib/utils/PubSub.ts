class Subscriber {
    public topic: any;
    public action: Function;
    public token: Token;

    /**
     * @param topic {*}
     * @param action {CallableFunction}
     */
    constructor(topic: any, action: Function) {
        this.topic = topic;
        this.action = action;
        this.token = TokenGenerator.getRandomToken();
    }
}

class Token {
    public token: symbol;

    /**
     * @param token {symbol}
     */
    constructor(token: symbol) {
        this.token = token;
    }
}

class TokenGenerator {
    /**
     * @returns {Token}
     */
    static getRandomToken() {
        return new Token(Symbol('token'));
    }
}

export class PubSub {
    private static subs: Array<Subscriber> = [];

    /**
     * @description Method that creates subscriber and bind it to updates
     * @param topic {*}
     * @param action {CallableFunction}
     * @returns {Token}
     */
    static subscribe(topic: any, action: Function) {
        const subscriber = new Subscriber(topic, action);
        PubSub.subs.push(subscriber);
        return subscriber.token;
    }

    /**
     * @description Method that unbind subscriber from updates
     * @param token {Token|Function}
     */
    static unsubscribe(token: Token|Function) {
        if (token instanceof Token)
            PubSub.subs = PubSub.subs.filter(sub => sub.token !== token);
        else
            PubSub.subs = PubSub.subs.filter(sub => sub.action !== token);
    }

    /**
     * @description Method that notify subscribers
     * @param topic {*}
     * @param data {*}
     */
    static publish(topic: any, data: any) {
        PubSub.subs.forEach(sub => {
            if (sub.topic === topic)
                sub.action(data);
        });
    }

    /**
     * @description Method that remove all subscribers
     */
    static clearAllSubscriptions() {
        PubSub.subs = [];
    }
}
