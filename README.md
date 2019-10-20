## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false,index: true|
|email|text|null: false,add_index unique: true|
|password|text|null: false|
### Association
- has_many :posts
- has_many :users_groups
- has_many :groups, through: :users_groups

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :posts
- has_many :users_groups
- has_many :users, through: :users_groups

## users_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## postsテーブル
|Column|Type|Options|
|------|----|-------|
|text|text||
|image|text||
|user_id|references|null: false,foreign_key: true|
|group_id|references|null: false,foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group