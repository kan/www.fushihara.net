# www.fushihara.net

https://www.fushihara.net/ のファイルを管理している。以下自分用メモ

## 環境準備

```sh
npm install
gulp
```

### gulp build

各ファイルを処理しつつ配信用の dist/ 以下に展開

### gulp release

本番サーバーでこのリポジトリを pull する。gulp build が事前に実行される。

## TODO

* css ファイルの統合
  * 要らない気がする
* css に sourcemap
* 一瞬白くなる問題への対応
  * あるいは Noto Font を捨てる
* blog の記事リストを載せる
* ~~github と slideshare のとこをAPIからの自動取得に~~
* soozy slack の invite page のデザインをもうちょっと何とかしたい
