
# Request
### Extends **{BaseRequest}**

* [Request](https://github.com/ServerfulArch/Views/blob/master/Documentation/Request.md)

An extended class modified for the Serverful/Views extension.



# Values
## [.Views](https://github.com/ServerfulArch/Views/blob/master/lib/Request.js#L19)
> A directory with all views. [**Read Only**]
>
> Type **{String}**

# Methods
## [.Fetch(Identifier)](https://github.com/ServerfulArch/Views/blob/master/lib/Request.js#L33)
> Retrieves a raw resource.
> | Key | Type | Description |
> | --- | --- | --- |
> | Identifier | String | A file path. |
>
> Returns **{String?}**

## [.View(Identifier, Code?)](https://github.com/ServerfulArch/Views/blob/master/lib/Request.js#L44)
> Retrieves a view and writes it to the client.
> | Key | Type | Description |
> | --- | --- | --- |
> | Identifier | String | A file path. |
> | Code? | Number | Status to end this request with. |
>
> Returns **{Request}**

## [.Render(Identifier, Document?, Code?)](https://github.com/ServerfulArch/Views/blob/master/lib/Request.js#L57)
> Retrieves a view and renders it.
> | Key | Type | Description |
> | --- | --- | --- |
> | Identifier | String | A file path. |
> | Document? | Object, Array | A context object or array with render items. |
> | Code? | Number | Status to end this request with. |
>
> Returns **{Request}**
