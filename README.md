# www.fushihara.net

https://www.fushihara.net/ のファイルを管理している。以下自分用メモ

## 環境準備

```sh
npm install
bower install
gulp
```

### gulp build

各ファイルを処理しつつ配信用の dist/ 以下に展開

### gulp release

本番サーバーでこのリポジトリを pull する。

## TODO

* sourcemap対応したが、本当はmain.jsxへmappingしたい
* async付けたいので、vendor.jsとmain.jsは統合するべき?
* soozy slack の invite page のデザインをもうちょっと何とかしたい
