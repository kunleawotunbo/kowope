1.  ## To start ionic
        ionic serve -l

        https://www.djamware.com/post/59fc9da680aca7739224ee20/ionic-3-and-angular-5-mobile-app-example

        https://github.com/didinj/ionic3-angular5-mobile-app-example

2.  ## Build before opening the project in android studio

        //ionic cordova build --release android

        ionic cordova build android --prod --release

        Then go to android studio, open the android folder of the ionic project with android studio. 
        Goto build -> Generate Signed APK -> Select keystore -> check sign jar and apk

        #To run on android emulator

        ionic cordova run android

        # Run on android phone using command prompt

        ionic cordova run android -l

3.  ## To display detail arrow on list
        Add details-push to the list item and if it doesn't show, override the variale.scss
        http://technotip.com/5051/details-arrow-ionic-2/

4.  ##  To generate resources i.e icon and splash

        ionic cordova resources

5.  ##  When splashscreen is blank
        https://stackoverflow.com/questions/36132883/ionic-app-splash-screen-are-not-shown

6.  ##  Inspect devices

        chrome://inspect/#devices

7.  ##  Added background image to the side menu
    Check inside the app.scss to add the background-image in the toolbar

        ion-toolbar{         
                .toolbar-background{background:$menu_bg_color; border:0px; background-image:url('../assets/images/sidemenu-pattern.png');
                }
        }

    And also inside the background image in the ion-content

        ion-content{
                
                background-color:$menu_bg_color !important;
                background-image:url('../assets/images/sidemenu-pattern.png'); 
        }

8. ##   Google play console
        https://play.google.com/apps/publish

9.   ## Run on android with live reload

        ionic cordova run android -l

10.     ## Remove and add platform

        ionic platform rm android
        ionic platform add android

11.     ## OneSignal Push Notification

        https://www.youtube.com/watch?v=9iqRTX7RNds

12.     ## Auto Hiding Header on Scroll in Ionic
        https://www.youtube.com/watch?v=abDaZnx6tkU

13.     ## Building an Accordion Component in Ionic 3
        https://www.youtube.com/watch?v=47DP2db-4k8

14.     ## Show/Hide password icon
        https://stackoverflow.com/a/49099347/2105396
15.     ## Remove splash screen spinner
        Add this in the config
        
        <preference name="ShowSplashScreenSpinner" value="false"/>

16.     ## Double tap back button to exit

        https://pointdeveloper.com/ionic-double-tap-back-button-exit/

17.     ## Social Sharing
        https://pointdeveloper.com/add-social-sharing-to-your-ionic-2-app/
        https://medium.com/@mikeyny/easy-social-sharing-with-ionic-3-and-ionic-native-f2c42807f43c

        ## Pass data to popover
        https://stackoverflow.com/a/45096561/2105396

18.     ## Style Ionic Popover
        The style should be done in app.scss

        https://stackoverflow.com/a/45825084/2105396

19.     ## Map Launch Navigator

        https://stackoverflow.com/a/45996649/2105396

20.     ## Ionic 3 and Angular 4 Multi Level Accordion Menu Example

        Dynamic Menu
        https://www.djamware.com/post/58fdf9f080aca7414e78a63a/ionic-3-and-angular-4-multi-level-accordion-menu-example

21.     ## Center ion-title in header

        https://stackoverflow.com/a/43650789/2105396

22.     ## To downgrade ionic

        Note you can downgrade to your old version by running

        npm i -g ionic@3.19.0

23.     ##  Lifecycle hooks
        https://webcake.co/page-lifecycle-hooks-in-ionic-2/


24.     ## Integrate JQuery into Ionic

        https://www.youtube.com/watch?v=xWIzZ8wBqk0




















        https://medium.com/@mosesesan/tutorial-5-how-to-build-a-laravel-5-4-jwt-authentication-api-with-e-mail-verification-61d3f356f823
https://laravel.com/docs/5.5/routing#route-group-prefixes
https://ionicacademy.com/style-ui-ionic/
https://devdactic.com/category/ionic/page/4/
https://forum.ionicframework.com/c/tutorials
https://ampersandacademy.com/tutorials/ionic-framework-version-2/push-notification-in-ionic-2-native-plugin-version-2-3-with-firebase-hosting-service-provider
https://www.youtube.com/channel/UCDXWrSUyXN47WOF0Ih5AjIg
https://github.com/laravel-notification-channels/onesignal
https://github.com/berkayk/laravel-onesignal
https://www.youtube.com/channel/UCDXWrSUyXN47WOF0Ih5AjIg
https://www.youtube.com/watch?v=abDaZnx6tkU
https://forum.ionicframework.com/t/how-to-add-external-javascript-library-in-ionic2-application/87669/2
https://stackoverflow.com/questions/42305422/how-can-i-use-jquery-with-ionic-2?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
https://stackoverflow.com/questions/37893131/how-to-convert-lat-long-from-decimal-degrees-to-dms-format?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
https://www.youtube.com/watch?v=eVdn8zd7eiA
https://www.youtube.com/channel/UCWJ7mGafYEv0_pXzBOQ1XNw
https://www.youtube.com/watch?v=0O4fyjDg2Tw
https://onesignal.com/apps/923f0eae-ee5f-4c1f-b752-1b7fe641ff2e/segments
https://pointdeveloper.com/category/ionic-framework/
https://pointdeveloper.com/add-social-sharing-to-your-ionic-2-app/
https://ionicframework.com/docs/components/#buttons
https://github.com/doo/scanbot-sdk-example-ionic2/blob/master/src/pages/sdk-ui/sdk-ui.ts
https://market.ionicframework.com/themes/ionic-social-buttons
https://material.io/tools/icons/?style=sharp
https://ionicframework.com/docs/api/components/alert/AlertController/
https://forum.ionicframework.com/t/usage-of-cssclass-to-style-alert-button-in-ionic/55970/13
https://www.djamware.com/post-sub-category/5845691a80aca7763489d872/ionic-framework
https://www.djamware.com/post/587d543080aca723c115beaf/how-to-mixing-side-menu-and-tabs-in-ionic-2
https://stackoverflow.com/questions/43497778/ionic-2-alert-customization?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
https://www.joshmorony.com/high-performance-parallax-animation-in-ionic-2/
https://www.youtube.com/watch?v=e75qpU1NgeU&t=21s
https://stackoverflow.com/questions/49629655/ionic-avatar-cant-put-the-notification-icon?rq=1
https://ionicacademy.com/accordion-list-ionic/

