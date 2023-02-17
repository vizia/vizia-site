export enum SvgIcon {
    None, Selector, ChevronDown, ChevronRight, HamburgerMenu
}

export const svgs: Map<SvgIcon, [string[], [number, number]]> = new Map(
    [
        [SvgIcon.None, [[""], [1, 1]]],
        [SvgIcon.Selector, [["M12 6C12.5523 6 13 6.44772 13 7V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V7C11 6.44772 11.4477 6 12 6Z"], [24, 24]]],
        [SvgIcon.ChevronDown, [["M0.292893 2.29289C0.683417 1.90237 1.31658 1.90237 1.70711 2.29289L5 5.58579L8.29289 2.29289C8.68342 1.90237 9.31658 1.90237 9.70711 2.29289C10.0976 2.68342 10.0976 3.31658 9.70711 3.70711L5.70711 7.70711C5.31658 8.09763 4.68342 8.09763 4.29289 7.70711L0.292893 3.70711C-0.0976311 3.31658 -0.0976311 2.68342 0.292893 2.29289Z"], [10, 10]]],
        [SvgIcon.ChevronRight, [["M9.29289 16.7071C8.90237 16.3166 8.90237 15.6834 9.29289 15.2929L12.5858 12L9.29289 8.70711C8.90237 8.31658 8.90237 7.68342 9.29289 7.29289C9.68342 6.90237 10.3166 6.90237 10.7071 7.29289L14.7071 11.2929C15.0976 11.6834 15.0976 12.3166 14.7071 12.7071L10.7071 16.7071C10.3166 17.0976 9.68342 17.0976 9.29289 16.7071Z"], [24, 24]]],
        [SvgIcon.HamburgerMenu, [["M5 12C5 11.4477 5.44772 11 6 11H18C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13L6 13C5.44772 13 5 12.5523 5 12Z", "M5 7C5 6.44772 5.44772 6 6 6H18C18.5523 6 19 6.44772 19 7C19 7.55228 18.5523 8 18 8H6C5.44772 8 5 7.55228 5 7Z", "M5 17C5 16.4477 5.44772 16 6 16H18C18.5523 16 19 16.4477 19 17C19 17.5523 18.5523 18 18 18H6C5.44772 18 5 17.5523 5 17Z"], [24, 24]]],
    ]
)