// acho que saporra pode ser substituída por uma async functions com await 🤦. "Vão" ver.

export class AsyncPromise<T> {

    private status!: string;

    private promise!: Promise<T>;

    private currentTimeout!: number;

    private _accomplishResponse: any;

    private _then!: (response: any) => void;

    private _reject!: () => void;

    private whenReject!: () => void;

    private self: AsyncPromise<T>;

    constructor (options: object, resolver: () => void) {
        this.self = this;

        if (typeof options == "function") {
            resolver = options as () => void;
            options = {};
        }

        this.start(resolver, options);
    }

    break (run: () => void) {
        if (typeof run != "function") {
            run = () => { };
        }

        this.whenReject = run;

        clearTimeout(this.currentTimeout);
        this._reject();
    }

    origin(): Promise<T> {
        // to work with async functions
        return this.promise;
    };

    then(callback: () => void) {
        this._then = callback;
    };

    catchException(run: () => void): AsyncPromise<T> {
        if (typeof run != "function") {
            run = function () { };
        }

        this.promise.catch(run);

        return this;
    };

    private accomplish(response: any) {
        // "fulfilled"
        this.status = "resolved";
        this._accomplishResponse = response;
    }

    private start(resolver: () => void, options: any) {

        if (typeof (options.defer != "number")) {
            options.defer = 0;
        }

        const loop: (_accomplish: (response?: any) => void, _reject: () => void, resolver: (response?: any) => void
            , options: any) => void = (
                _accomplish: (response?: any) => void
                , _reject: () => void
                , resolver: (response?: any) => void
                , options: any
            ) => {

                this.currentTimeout = window.setTimeout(
                    () => {
                        if (typeof resolver != "function" ||
                            (options.defer &&
                                typeof resolver != "function")) {
                            _accomplish();
                        } else {
                            options.defer = 0;
                            resolver.call(this.self, this.accomplish);
                            // returns the control for the user
                            switch (this.status) {
                                case "resolved": {
                                    _accomplish(this._accomplishResponse);
                                }
                                    break;
                                default: {
                                    loop(_accomplish, _reject, resolver, options);
                                }
                            }
                        }
                    },
                    options.defer
                );
            };

        this.promise = new Promise((_accomplish: (response: any) => void, reject: () => void) => {
            this._reject = reject;
            loop(_accomplish, reject, resolver, options);
        });

        this.promise.then(
            // response comes from original Promise object
            (r: any) => {
                this._then(r);
            },

            () => {
                this.whenReject();
            }
        );
    };

}
