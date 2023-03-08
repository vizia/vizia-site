const SELECTOR_SVG = ["M12 6C12.5523 6 13 6.44772 13 7V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V7C11 6.44772 11.4477 6 12 6Z"]
const CHEVRON_DOWN_SVG = ["M7.29289 9.29289C7.68342 8.90237 8.31658 8.90237 8.70711 9.29289L12 12.5858L15.2929 9.29289C15.68ChevronRight34 8.90237 16.3166 8.90237 16.7071 9.29289C17.0976 9.68342 17.0976 10.3166 16.7071 10.7071L12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L7.29289 10.7071C6.90237 10.3166 6.90237 9.68342 7.29289 9.29289Z"]
const CHEVRON_RIGHT_SVG = ["M9.29289 16.7071C8.90237 16.3166 8.90237 15.6834 9.29289 15.2929L12.5858 12L9.29289 8.70711C8.90237 8.31658 8.90237 7.68342 9.29289 7.29289C9.68342 6.90237 10.3166 6.90237 10.7071 7.29289L14.7071 11.2929C15.0976 11.6834 15.0976 12.3166 14.7071 12.7071L10.7071 16.7071C10.3166 17.0976 9.68342 17.0976 9.29289 16.7071Z"]
const HAMBURGER_MENU_SVG = ["M5 12C5 11.4477 5.44772 11 6 11H18C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13L6 13C5.44772 13 5 12.5523 5 12Z", "M5 7C5 6.44772 5.44772 6 6 6H18C18.5523 6 19 6.44772 19 7C19 7.55228 18.5523 8 18 8H6C5.44772 8 5 7.55228 5 7Z", "M5 17C5 16.4477 5.44772 16 6 16H18C18.5523 16 19 16.4477 19 17C19 17.5523 18.5523 18 18 18H6C5.44772 18 5 17.5523 5 17Z"]
const CROSS_SVG = ["M7.29302 7.29302C7.68354 6.90249 8.3167 6.90249 8.70723 7.29302L12 10.5858L15.2928 7.29302C15.6833 6.90249 16.3165 6.90249 16.707 7.29302C17.0975 7.68354 17.0975 8.3167 16.707 8.70723L13.4142 12L16.7072 15.293C17.0978 15.6835 17.0978 16.3167 16.7072 16.7072C16.3167 17.0978 15.6835 17.0978 15.293 16.7072L12 13.4142L8.70723 16.707C8.3167 17.0975 7.68354 17.0975 7.29302 16.707C6.90249 16.3165 6.90249 15.6833 7.29302 15.2928L10.5858 12L7.29302 8.70723C6.90249 8.3167 6.90249 7.68354 7.29302 7.29302Z"]
const RUST_LANGUAGE_SVG = ["M72.3261 19.4105C72.0526 18.9689 71.5702 18.7002 71.0508 18.7002C70.5314 18.7002 70.049 18.9689 69.7755 19.4105L66.4977 24.7036L62.2466 20.1559C61.8921 19.7767 61.3668 19.6077 60.8578 19.7091C60.3487 19.8105 59.9283 20.1679 59.7461 20.6539L57.5641 26.4777L52.5063 22.8422C52.0846 22.5391 51.5362 22.4757 51.0565 22.6745C50.5767 22.8733 50.234 23.3061 50.1504 23.8186L49.1465 29.9711L43.4729 27.3853C43 27.1697 42.4492 27.2144 42.0171 27.5032C41.5851 27.792 41.3333 28.2839 41.3517 28.8033L41.5722 35.0296L35.5047 33.6002C34.999 33.481 34.4676 33.6321 34.1001 33.9995C33.7327 34.367 33.5816 34.8984 33.7008 35.4042L35.1302 41.4716L28.9039 41.2511C28.3845 41.2327 27.8926 41.4845 27.6038 41.9166C27.3149 42.3486 27.2703 42.8994 27.4859 43.3723L30.0717 49.0459L23.9192 50.0498C23.4067 50.1334 22.9739 50.4762 22.7751 50.9559C22.5763 51.4356 22.6397 51.984 22.9428 52.4057L26.5783 57.4635L20.7545 59.6455C20.2684 59.8277 19.9111 60.2481 19.8097 60.7572C19.7083 61.2662 19.8773 61.7915 20.2565 62.146L24.8042 66.3971L19.5111 69.6749C19.0695 69.9484 18.8008 70.4308 18.8008 70.9502C18.8008 71.4696 19.0695 71.952 19.5111 72.2255L24.8042 75.5033L20.2565 79.7544C19.8773 80.1089 19.7083 80.6342 19.8097 81.1432C19.9111 81.6523 20.2684 82.0727 20.7545 82.2548L26.5783 84.4369L22.9428 89.4947C22.6397 89.9164 22.5763 90.4648 22.7751 90.9445C22.9739 91.4242 23.4067 91.767 23.9192 91.8506L30.0717 92.8545L27.4859 98.5281C27.2703 99.001 27.3149 99.5518 27.6038 99.9838C27.8926 100.416 28.3845 100.668 28.9039 100.649L35.1302 100.429L33.7008 106.496C33.5816 107.002 33.7327 107.533 34.1001 107.901C34.4676 108.268 34.999 108.419 35.5047 108.3L41.5722 106.871L41.3517 113.097C41.3333 113.616 41.5851 114.108 42.0171 114.397C42.4492 114.686 43 114.731 43.4729 114.515L49.1465 111.929L50.1504 118.082C50.234 118.594 50.5767 119.027 51.0565 119.226C51.5362 119.425 52.0846 119.361 52.5063 119.058L57.5641 115.423L59.7461 121.246C59.9283 121.733 60.3487 122.09 60.8578 122.191C61.3668 122.293 61.8921 122.124 62.2466 121.745L66.4977 117.197L69.7755 122.49C70.049 122.932 70.5314 123.2 71.0508 123.2C71.5702 123.2 72.0526 122.932 72.3261 122.49L75.6038 117.197L79.855 121.745C80.2094 122.124 80.7347 122.293 81.2438 122.191C81.7529 122.09 82.1733 121.733 82.3554 121.246L84.5375 115.423L89.5953 119.058C90.017 119.361 90.5654 119.425 91.0451 119.226C91.5248 119.027 91.8676 118.594 91.9512 118.082L92.9551 111.929L98.6287 114.515C99.1016 114.731 99.6524 114.686 100.084 114.397C100.516 114.108 100.768 113.616 100.75 113.097L100.529 106.871L106.597 108.3C107.103 108.419 107.634 108.268 108.001 107.901C108.369 107.533 108.52 107.002 108.401 106.496L106.971 100.429L113.198 100.649C113.717 100.668 114.209 100.416 114.498 99.9838C114.787 99.5518 114.831 99.001 114.616 98.5281L112.03 92.8545L118.182 91.8506C118.695 91.767 119.128 91.4242 119.326 90.9445C119.525 90.4648 119.462 89.9164 119.159 89.4947L115.523 84.4369L121.347 82.2548C121.833 82.0727 122.19 81.6523 122.292 81.1432C122.393 80.6342 122.224 80.1089 121.845 79.7544L117.297 75.5033L122.59 72.2255C123.032 71.952 123.301 71.4696 123.301 70.9502C123.301 70.4308 123.032 69.9484 122.59 69.6749L117.297 66.3971L121.845 62.146C122.224 61.7915 122.393 61.2662 122.292 60.7572C122.19 60.2481 121.833 59.8277 121.347 59.6455L115.523 57.4635L119.159 52.4057C119.462 51.984 119.525 51.4356 119.326 50.9559C119.128 50.4762 118.695 50.1334 118.182 50.0498L112.03 49.0459L114.616 43.3723C114.831 42.8994 114.787 42.3486 114.498 41.9166C114.209 41.4845 113.717 41.2327 113.198 41.2511L106.971 41.4716L108.401 35.4042C108.52 34.8984 108.369 34.367 108.001 33.9995C107.634 33.6321 107.103 33.481 106.597 33.6002L100.529 35.0296L100.75 28.8033C100.768 28.2839 100.516 27.792 100.084 27.5032C99.6524 27.2144 99.1016 27.1697 98.6287 27.3853L92.9551 29.9711L91.9512 23.8186C91.8676 23.3061 91.5248 22.8733 91.0451 22.6745C90.5654 22.4757 90.017 22.5391 89.5953 22.8422L84.5375 26.4777L82.3554 20.6539C82.1733 20.1679 81.7529 19.8105 81.2438 19.7091C80.7347 19.6077 80.2094 19.7767 79.855 20.1559L75.6038 24.7036L72.3261 19.4105ZM73.1213 28.819C72.5571 28.238 71.789 27.9011 70.9808 27.8802C70.5649 27.8682 70.1508 27.9397 69.763 28.0906C69.3752 28.2415 69.0217 28.4687 68.7233 28.7587C68.4249 29.0486 68.1877 29.3956 68.0258 29.7789C67.8639 30.1622 67.7806 30.5741 67.7808 30.9902C67.7808 31.815 68.1084 32.6061 68.6917 33.1893C69.2749 33.7725 70.066 34.1002 70.8908 34.1002C71.7156 34.1002 72.5067 33.7725 73.0899 33.1893C73.6731 32.6061 74.0008 31.815 74.0008 30.9902C74.0011 30.1791 73.6855 29.4 73.1213 28.819ZM93.2564 39.444C88.732 36.2216 83.5604 34.0228 78.1008 33.0002L72.7408 38.1102C71.6108 39.2002 69.8208 39.1502 68.7408 38.0202L63.9508 33.0002C55.6799 34.5628 48.1548 38.8086 42.5408 45.0802H83.1408C84.1608 45.0802 87.9408 45.5302 91.3608 47.7802C93.7908 49.3902 97.3608 52.6702 97.3608 57.8802C97.3608 62.7002 93.3608 66.3102 89.5108 68.7502C92.6108 71.2002 94.5708 72.6102 95.7508 79.2402C96.0308 80.4602 98.2408 81.5302 100.241 81.3002C102.341 81.0702 104.731 80.1402 104.731 75.9002V74.1002C104.731 73.7202 104.891 73.4602 105.281 73.4602H109.211C109.377 71.2487 109.35 69.027 109.131 66.8202L102.071 63.6902C100.651 63.0502 100.001 61.3702 100.631 59.9402L104.301 51.6602C101.549 46.8349 97.7808 42.6663 93.2564 39.444ZM36.0419 56.9623C35.478 56.3816 34.7099 56.0436 33.9008 56.0202C33.4849 56.0082 33.0708 56.0797 32.683 56.2306C32.2952 56.3815 31.9417 56.6087 31.6433 56.8987C31.3449 57.1886 31.1077 57.5356 30.9458 57.9189C30.7839 58.3022 30.7006 58.7141 30.7008 59.1302C30.7008 59.955 31.0284 60.7461 31.6117 61.3293C32.1949 61.9125 32.986 62.2402 33.8108 62.2402C34.6356 62.2402 35.4266 61.9125 36.0099 61.3293C36.5931 60.7461 36.9208 59.955 36.9208 59.1302C36.9211 58.3207 36.6058 57.543 36.0419 56.9623ZM110.192 57.1023C109.628 56.5216 108.86 56.1836 108.051 56.1602C107.635 56.1482 107.221 56.2197 106.833 56.3706C106.445 56.5215 106.092 56.7487 105.793 57.0387C105.495 57.3286 105.258 57.6756 105.096 58.0589C104.934 58.4422 104.851 58.8541 104.851 59.2702C104.851 60.095 105.178 60.8861 105.762 61.4693C106.345 62.0525 107.136 62.3802 107.961 62.3802C108.786 62.3802 109.577 62.0525 110.16 61.4693C110.743 60.8861 111.071 60.095 111.071 59.2702C111.071 58.4607 110.756 57.683 110.192 57.1023ZM45.1808 56.6602H39.7608L41.1408 59.7702C41.7808 61.2002 41.1308 62.8702 39.7008 63.5102L33.0008 66.4902C32.4686 71.3946 32.8897 76.3556 34.2408 81.1002H45.1808V56.6602ZM75.2908 56.9202H62.3808L62.3708 64.1302H74.3508C76.9008 64.1302 80.0008 63.2302 80.0008 60.7202C80.0008 57.6902 75.9608 56.9202 75.2908 56.9202ZM72.2708 74.4802H62.3808L62.3708 81.4902H71.5208C71.8708 81.4902 72.1108 81.5602 72.1108 81.8802V92.9402C72.1108 93.2702 71.8708 93.3302 71.5208 93.3302H40.2508C41.2684 94.7098 42.3776 96.0194 43.5708 97.2502L50.0008 95.8702C51.5308 95.5402 53.0308 96.5202 53.3608 98.0502L54.9208 105.33C59.9157 107.65 65.3523 108.864 70.8594 108.89C76.3665 108.916 81.8143 107.753 86.8308 105.48L88.3908 98.2002C88.7208 96.6702 90.2308 95.6902 91.7608 96.0202L98.3308 97.4302C99.6061 96.1489 100.789 94.7788 101.871 93.3302H85.7308C83.1808 93.3302 80.7908 89.7302 80.2008 87.9302C79.6108 86.3202 78.7408 81.3002 78.3508 79.7602C77.1008 74.7402 73.1708 74.4802 72.2708 74.4802ZM50.0919 100.752C49.528 100.172 48.7599 99.8336 47.9508 99.8102C47.5349 99.7982 47.1208 99.8697 46.733 100.021C46.3452 100.171 45.9917 100.399 45.6933 100.689C45.3949 100.979 45.1577 101.326 44.9958 101.709C44.8339 102.092 44.7506 102.504 44.7508 102.92C44.7508 103.745 45.0784 104.536 45.6617 105.119C46.2449 105.703 47.036 106.03 47.8608 106.03C48.6856 106.03 49.4766 105.703 50.0599 105.119C50.6431 104.536 50.9708 103.745 50.9708 102.92C50.9711 102.111 50.6558 101.333 50.0919 100.752ZM96.1419 100.892C95.578 100.312 94.8099 99.9736 94.0008 99.9502C93.5849 99.9382 93.1708 100.01 92.783 100.161C92.3952 100.311 92.0417 100.539 91.7433 100.829C91.4449 101.119 91.2077 101.466 91.0458 101.849C90.8839 102.232 90.8006 102.644 90.8008 103.06C90.8008 103.885 91.1284 104.676 91.7117 105.259C92.2949 105.843 93.086 106.17 93.9108 106.17C94.7356 106.17 95.5266 105.843 96.1099 105.259C96.6931 104.676 97.0208 103.885 97.0208 103.06C97.0211 102.251 96.7059 101.473 96.1419 100.892Z"]
const IMAGE_SVG = ["M6 16.5V18H18V13.8028L17.023 12.3373C16.6035 11.7081 15.6644 11.7542 15.3086 12.4214L14.2051 14.4904C13.2378 16.3041 10.7492 16.5773 9.41147 15.0166C9.09591 14.6485 8.54877 14.5884 8.16085 14.8794L6 16.5ZM18 10.4941C16.5954 9.42826 14.4456 9.78956 13.5439 11.4802L12.4404 13.5493C12.1356 14.1207 11.3515 14.2068 10.93 13.7151C9.92846 12.5466 8.192 12.356 6.96085 13.2794L6 14V6H18V10.4941ZM20 6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V6Z"]

export enum SvgIcon {
    None, Selector, ChevronDown, ChevronRight, HamburgerMenu, Cross, RustLanguage, Image
}

export const SVGS: Map<SvgIcon, [string[], [number, number]]> = new Map(
    [
        [SvgIcon.None, [[""], [1, 1]]],
        [SvgIcon.Selector, [SELECTOR_SVG, [24, 24]]],
        [SvgIcon.ChevronDown, [CHEVRON_DOWN_SVG, [24, 24]]],
        [SvgIcon.ChevronRight, [CHEVRON_RIGHT_SVG, [24, 24]]],
        [SvgIcon.HamburgerMenu, [HAMBURGER_MENU_SVG, [24, 24]]],
        [SvgIcon.Cross, [CROSS_SVG, [24, 24]]],
        [SvgIcon.RustLanguage, [RUST_LANGUAGE_SVG, [144, 144]]],
        [SvgIcon.Image, [IMAGE_SVG, [24, 24]]]
    ]
)

export function iconFromExtension(ext: string): SvgIcon {
    switch (ext) {
        case "rs":
            return SvgIcon.RustLanguage;
        case "png":
        case "jpg":
            return SvgIcon.Image;
        default:
            return SvgIcon.None;
    }
}
