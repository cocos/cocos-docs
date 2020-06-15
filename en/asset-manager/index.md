# Asset Manager

> Author：Santy-Wang

During the development of the game, there will be a need to use a lot of resources such as pictures, audio, etc. to enrich the entire game. This is why Creator provides the `Asset Manager` module to help developers manage the use of their resources and improve development efficiency.

The `Asset Manager` is a new module from Creator in v2.4, replacing the previous `cc.loader`. The new `Asset Manager` module implements all resource related functions including loading, querying, destruction, caching, and Asset Bundle, and provides great scalability, allowing you to extend the functionality you need with Asset Manager.


Relevant references.

- [Asset Manager Overview](asset-manager.md)
- [Asset Bundle](bundle.md)
- [Release Of Resources](release-manager.md)
- [Downloader And Parser](downloader-parser.md)
- [Loading and Preloading](preload-load.md)
- [Cache Manager](cache-manager.md)
- [Optional Parameters](options.md)
- [Pipeline And Task](pipeline-task.md)


**Note**: The common APIs in `cc.loader` will remain compatible for some time, but we strongly recommend using Asset Manager for new projects.