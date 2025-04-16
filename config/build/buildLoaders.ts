import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
    const isDev = options.mode === 'development';

    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev ? '[name]__[local]__[hash:base64:5]' : '[hash:base64:8]'
            },
        },
    }

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // For dev, it injects styles into the DOM. For prod, it extracts into a separate CSS file.
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            cssLoaderWithModules,  // Handles CSS files
            "sass-loader", // Processes SCSS to CSS
        ],
    };


    const tsLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,

    }

    return [
        scssLoader,
        tsLoader
    ]
}
