module.exports = {
  pages: {
    "index": {
      entry: "./src/main.ts",
      template: "public/index.html",
      filename: "index.html",
      chunks: ["chunk-vendors", "chunk-common", "index"]
    }
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          include: /src/,
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            appendTsSuffixTo: [/\.vue$/]
          }
        },
      ]
    },
    resolve: {
      extensions: ["*", ".js", ".vue", ".json", ".ts"]
    }
  }
};