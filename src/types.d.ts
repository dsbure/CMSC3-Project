declare module 'random-material-color' {
  export interface GetColorOptions {
    text?: string;
    shades?: string[];
    colors?: string[];
  }

  export function getColor(options?: GetColorOptions): string;

  const randomMC: {
    getColor: (options?: GetColorOptions) => string;
  };

  export default randomMC;
}
