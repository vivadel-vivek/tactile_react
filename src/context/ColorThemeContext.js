// Import create data context helper
import createDataContext from "context/createDataContext";
// import palx
import palx from "palx";

// CUSTOMIZE THESE DEFAULTS TO SET YOUR BASE THEME
// default color
const defaultColor = "#07c";
// default paletteMap
const defaultPaletteMap = {
  primary: "blue6",
  secondary: "gray6",
  success: "green6",
  danger: "red6",
  warning: "yellow6",
  info: "cyan6",
  light: "gray1",
  dark: "gray8",
  white: "gray0",
  black: "gray9",
};
// Example state object
// const exampleState = {
//   base: "#07c",
//   primary: "#5aa7de",
//   secondary: "#98a1a8",
//   success: "#0fb900",
//   danger: "#e6838b",
//   warning: "#b0a200",
//   info: "#00b3a4",
//   light: "#eceeef",
//   dark: "#606e79",
//   white: "#f9f9fa",
//   black: "#374047",
//   colors: {
//     gray0: "#f9f9fa",
//     gray1: "#eceeef",
//     gray2: "#dee1e3",
//     gray3: "#cfd3d7",
//     gray4: "#bfc5c9",
//     gray5: "#adb4b9",
//     gray6: "#98a1a8",
//     gray7: "#7f8b93",
//     gray8: "#606e79",
//     gray9: "#374047",
//     blue0: "#f6fafd",
//     blue1: "#e2eff9",
//     blue2: "#cce4f5",
//     blue3: "#b5d8f0",
//     blue4: "#9bcaeb",
//     blue5: "#7dbae5",
//     blue6: "#5aa7de",
//     blue7: "#2d8fd5",
//     blue8: "#006fbe",
//     blue9: "#004170",
//     indigo0: "#f9f9fe",
//     indigo1: "#ebedfb",
//     indigo2: "#dddff8",
//     indigo3: "#cdd1f5",
//     indigo4: "#bcc0f2",
//     indigo5: "#a9aeee",
//     indigo6: "#929ae9",
//     indigo7: "#7780e4",
//     indigo8: "#525edc",
//     indigo9: "#0516cd",
//     violet0: "#fbf8fe",
//     violet1: "#f1ebfb",
//     violet2: "#e8dcf8",
//     violet3: "#ddccf5",
//     violet4: "#d1baf1",
//     violet5: "#c4a6ed",
//     violet6: "#b48ee8",
//     violet7: "#a172e3",
//     violet8: "#864adb",
//     violet9: "#4c00b8",
//     fuschia0: "#fdf8fe",
//     fuschia1: "#f9e8fa",
//     fuschia2: "#f5d8f7",
//     fuschia3: "#f0c5f3",
//     fuschia4: "#eab0ef",
//     fuschia5: "#e498ea",
//     fuschia6: "#dc7be5",
//     fuschia7: "#d153dd",
//     fuschia8: "#bb01cc",
//     fuschia9: "#72007c",
//     pink0: "#fef8fb",
//     pink1: "#fbe9f3",
//     pink2: "#f7d8ea",
//     pink3: "#f4c6e1",
//     pink4: "#f0b2d6",
//     pink5: "#eb9ac9",
//     pink6: "#e57dba",
//     pink7: "#dd57a5",
//     pink8: "#cf0d7e",
//     pink9: "#7f004a",
//     red0: "#fef8f9",
//     red1: "#fbe9eb",
//     red2: "#f8dadc",
//     red3: "#f4c8cc",
//     red4: "#f0b5ba",
//     red5: "#ec9ea5",
//     red6: "#e6838b",
//     red7: "#df5f6a",
//     red8: "#d2202f",
//     red9: "#85000b",
//     orange0: "#fdf9f5",
//     orange1: "#f9ebe1",
//     orange2: "#f5dccb",
//     orange3: "#f0ccb3",
//     orange4: "#eaba98",
//     orange5: "#e4a679",
//     orange6: "#dd8d54",
//     orange7: "#d36d24",
//     orange8: "#b54c00",
//     orange9: "#6b2d00",
//     yellow0: "#fbfaec",
//     yellow1: "#f3efc4",
//     yellow2: "#eae398",
//     yellow3: "#e0d666",
//     yellow4: "#d5c72c",
//     yellow5: "#c5b500",
//     yellow6: "#b0a200",
//     yellow7: "#978b00",
//     yellow8: "#776e00",
//     yellow9: "#464000",
//     lime0: "#f6fcee",
//     lime1: "#e2f4c8",
//     lime2: "#cbec9e",
//     lime3: "#b2e26e",
//     lime4: "#94d736",
//     lime5: "#75c800",
//     lime6: "#68b300",
//     lime7: "#599900",
//     lime8: "#477900",
//     lime9: "#294700",
//     green0: "#f2fcf1",
//     green1: "#d6f6d3",
//     green2: "#b6efb1",
//     green3: "#90e788",
//     green4: "#61dd56",
//     green5: "#1fcf0f",
//     green6: "#0fb900",
//     green7: "#0d9f00",
//     green8: "#0b7e00",
//     green9: "#064a00",
//     teal0: "#f1fcf6",
//     teal1: "#d2f6e1",
//     teal2: "#afefc9",
//     teal3: "#85e7ae",
//     teal4: "#52dc8b",
//     teal5: "#0ace5c",
//     teal6: "#00b84d",
//     teal7: "#009e42",
//     teal8: "#007d34",
//     teal9: "#004a1f",
//     cyan0: "#f0fcfb",
//     cyan1: "#cef5f2",
//     cyan2: "#a8eee8",
//     cyan3: "#7ae4dc",
//     cyan4: "#40d9cc",
//     cyan5: "#00c9b8",
//     cyan6: "#00b3a4",
//     cyan7: "#009a8d",
//     cyan8: "#007a70",
//     cyan9: "#004842",
//   },
// };

const isHex = (h) =>
  typeof h === "string" &&
  (h.length === 6 || h.length === 3) &&
  !isNaN(Number("0x" + h));

const generateColors = (baseColor) => {
  try {
    if (baseColor[0] === "#") {
      baseColor = baseColor.substring(1);
    }
    console.log(`Generating color scheme from base color #${baseColor}`);
    // throw an error if baseColor is not a hex code
    if (!isHex(baseColor))
      throw new Error("Base color not a valid hex string.");
    // initialize new color scheme
    const colorScheme = {};
    // use palx to create a new color scheme
    const palxObject = palx(baseColor);
    // will create the state.colors
    for (const [key, value] of Object.entries(palxObject)) {
      if (Array.isArray(value) && key !== "gray2") {
        // if the value is an array
        // write the color value to keys such as gray1, gray2, etc.
        // if the value is not an array, it's setting a base, or black, which is not needed because user sets these using the palette
        for (let i = 0; i < value.length; i++) {
          // for each color in the array
          const color = value[i];
          // save our color to our scheme as "colorindex" such as gray1
          // will create a range of colors such as gray0, gray1... gray9
          const colorKey = `${key}${i}`;
          colorScheme[colorKey] = color;
        }
      }
    }
    console.log("New color scheme generated:", colorScheme);
    return colorScheme;
  } catch (error) {
    console.error("Error generating color scheme:", error);
  }
};

const createUserPalette = (userPalette) => {
  try {
    const paletteObject = userPalette | {};
    let paletteMap = defaultPaletteMap;
    for (const key in paletteObject) {
      // only overwrite palette keys that exist in the palette - restricts creation of giant palettes
      if (
        // Object.hasOwnProperty.call(paletteObject, key) &&
        Object.hasOwnProperty.call(paletteMap, key)
      ) {
        // set our palette object as requested by the user
        paletteMap[key] = paletteObject[key];
        console.log("Created user palette map:", paletteMap);
      } else throw new Error(`Invalid palette key: ${paletteObject[key]}`);
    }
    return paletteMap;
  } catch (error) {
    console.log("Could not create user palette:", error);
  }
};

const generatePalette = (colorScheme, paletteObject) => {
  try {
    // initialize our new palette
    let newPalette = {};
    for (const key in paletteObject) {
      if (Object.hasOwnProperty.call(paletteObject, key)) {
        const colorKey = paletteObject[key];
        newPalette[key] = colorScheme[colorKey];
      } else throw new Error(`Invalid palette key: ${paletteObject[key]}`);
    }
    console.log("New Palette Created:", newPalette);
    return newPalette;
  } catch (error) {
    console.log("Could not generate color palette:", error);
  }
};

// Reducer tells the context how to interpret payloads
const themeReducer = (state, action) => {
  switch (action.type) {
    case "set_theme":
      return action.payload;
    default:
      return state;
  }
};

// Action functions to manipulate this context

// create color scheme from base color and set it as application palette
const setColorScheme = (dispatch) => async ({ baseColor, userPalette }) => {
  try {
    const colorScheme = generateColors(
      isHex(baseColor) ? baseColor : defaultColor
    );
    const customPalette = generatePalette(
      colorScheme,
      createUserPalette(userPalette)
    );
    dispatch({
      type: "set_theme",
      payload: {
        base: baseColor[0] === "#" ? baseColor : `#${baseColor}`,
        ...customPalette,
        colors: colorScheme,
      },
    });
  } catch (error) {
    console.error("Error setting color scheme:", error);
  }
};

// create a color theme from base color
// this does not modify our state, so we export it directly
// this is useful if a user wants to see a theme without setting it
export const createColorTheme = (baseColor, userPalette) => {
  try {
    const colorScheme = generateColors(
      isHex(baseColor) ? baseColor : defaultColor
    );
    const customPalette = generatePalette(
      colorScheme,
      createUserPalette(userPalette)
    );
    return {
      base: baseColor[0] === "#" ? baseColor : `#${baseColor}`,
      ...customPalette,
      colors: colorScheme,
    };
  } catch (error) {
    console.error("Error setting color scheme:", error);
  }
};
// default colorTheme
const defaultColorTheme = createColorTheme(defaultColor, defaultPaletteMap);

// create our data context
export const { Provider, Context } = createDataContext(
  themeReducer,
  {
    setColorScheme,
  },
  defaultColorTheme
);
