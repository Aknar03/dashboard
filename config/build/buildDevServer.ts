import type { Configuration as WebpackConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types/types';

export function buildDevServer(options: BuildOptions): WebpackConfiguration {
    return {
        port: options.port ?? 3000,
        open: true,
        historyApiFallback: true,
    }
}