import { Color, ColorType } from "../interfaces/chips";

export const assignColor = (color: ColorType): Color => {
    switch (color) {
        case 'success':
          return Color.SUCCESS
        case 'warning':
          return Color.WARNING;
        case 'error':
          return Color.ERROR;
        default:
          return Color.DEFAULT;
      }
}