export type TNodeEnv = 'development' | 'production' | 'test';

export const determineEvPath = (nodeEnv: TNodeEnv) => {
    const pathsToReturn = {
        development: '.env.development',
        production: '.env.production',
        test: '.env.test',
    };

    return pathsToReturn[nodeEnv];
};
