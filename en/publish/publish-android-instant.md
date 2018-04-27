# Publish Android Instant Games

## Requirement 
 - Android Studio 3.0+
 - Android Phone 8.0+
 - NDK r10c +
 
## Publish Process
 1. Start cocos creator. 
 2. Open Project->Build panel.
 3. Click **Record** button to open simulator ,it will record game resources info automatically.
    ![](./publish-google-instant/open-refactor.png)
    ![](./publish-google-instant/record.png)
    
 4. Click **Refactor** button to open Refactor panel, select the end point you want to pack into the first package,and then click **Save** button to save the package info.
    ![](./publish-google-instant/refactor.png)
    
 5. Click **Build** button to build the native android instant project then you can find it in the folder *build/android-instant*
 6. Open the Android-studio app and open the project we create (path:*build/android-instant/framework/runtime-src/pro.android-studio*)
    ![](./publish-google-instant/android-studio.png)
 
 7. Connect Android Phone (Android 8.0+) to the computer and make sure the computer and the phone at the same Local Area Network.
 8. Build project and run instantapp module