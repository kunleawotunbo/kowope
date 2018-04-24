# To start ionic
1.  ionic serve -l

# https://www.djamware.com/post/59fc9da680aca7739224ee20/ionic-3-and-angular-5-mobile-app-example

# https://github.com/didinj/ionic3-angular5-mobile-app-example

2.  I noticed that when building the app, the --release makes that app not to install on phone(corrupted),
so remove the --release makes it work

ionic cordova build android --prod

#To run on android emulator

ionic cordova run android

# To display detail arrow on list
3.  Add details-push to the list item and if it doesn't show, override the variale.scss
http://technotip.com/5051/details-arrow-ionic-2/

4.  To generate resources i.e icon and splash

ionic cordova resources
5.  When splashscreen is blank
https://stackoverflow.com/questions/36132883/ionic-app-splash-screen-are-not-shown