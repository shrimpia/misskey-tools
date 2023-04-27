# CONTRIBUTING

## データベース スキーマの編集

* TypeScriptのコーディング規約に一致するように、命名規則を定める
  * テーブル名は PascalCase
  * フィールド名は camelCase
  * データベース上は `@map` 等を用いて snake_case で保存する
* `///` （/3つ）で各要素ごとにコメントをつけること
  * `//` （/2つ）だと整形時に削除されてしまうため注意
* schema.prisma を編集したら、次のコマンドを実行してSQLファイルを生成する
  * `prisma migrate dev --name 変更名`
  * 変更名は snake_case