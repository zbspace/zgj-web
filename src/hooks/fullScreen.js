// 监听 全屏显示
// const initFullScreen = () => {
//   document.body.classList.toggle("fullscreen-enable");
//   if (
//     !document.fullscreenElement &&
//     /* alternative standard method */
//     !document.mozFullScreenElement &&
//     !document.webkitFullscreenElement
//   ) {
//     // current working methods
//     if (document.documentElement.requestFullscreen) {
//       document.documentElement.requestFullscreen();
//     } else if (document.documentElement.mozRequestFullScreen) {
//       document.documentElement.mozRequestFullScreen();
//     } else if (document.documentElement.webkitRequestFullscreen) {
//       document.documentElement.webkitRequestFullscreen(
//         Element.ALLOW_KEYBOARD_INPUT
//       );
//     }
//   } else {
//     if (document.cancelFullScreen) {
//       document.cancelFullScreen();
//     } else if (document.mozCa ncelFullScreen) {
//       document.mozCancelFullScreen();
//     } else if (document.webkitCancelFullScreen) {
//       document.webkitCancelFullScreen();
//     }
//   }
// }