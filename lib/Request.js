
const Cache = require("./Cache");

module.exports = (BaseRequest, Pathlike) => {

    const ViewCache = Cache.Initiate(Pathlike);

    return class Request extends BaseRequest {

        /**
         * An extended class modified for the Serverful/Views extension.
         * @param {...Any} _Args Default parameters for Serverful.
         * @extends {BaseRequest}
         */
        constructor (..._Args) {

            super(..._Args);

            /**
             * A directory with all views.
             * @name Request#Views
             * @type {String}
             * @readonly
             */
            Object.defineProperty(this, "Views", {
                enumerable: true,
                value: Pathlike
            });

        }


        /**
         * Retrieves the raw resource.
         * @param {String} Identifier A file path.
         * @returns {String?}
         */
        Fetch (Identifier) {
            const Endpoint = ViewCache.get(Identifier);
            if (!Endpoint) throw new RangeError("View wasn't found in cache.");
            return Endpoint;
        }

        /**
         * Retrives a view and writes it to the client.
         * @param {String} Identifier A file path.
         * @param {Number} [Code] Status to end this request with.
         */
        View (Identifier, Code = 200) {
            const {Resource, Type} = this.Fetch(Identifier);
            super.Header("Content-Type", Type);
            super.Write(Resource);
            return super.End(Code);
        }

        /**
         * Retrieves a view and renders it.
         * @param {String} Identifier A file path.
         * @param {Object|Array} [Document] A context object or array with render items.
         * @param {Number} [Code] Status to end this request with.
         */
        Render (Identifier, Document = {}, Code = 200) {
            const {Resource, Type} = this.Fetch(Identifier);
            super.Header("Content-Type", Type);
            super.Render(Resource, Document);
            return super.End(Code);
        }

    }
}
