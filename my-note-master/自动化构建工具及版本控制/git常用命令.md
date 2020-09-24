# 流程

## 初始化

1. git init
2. git remote set-url add \<name> \<url>
3. git remote -v (查看远程关联状态)

## 创建分支

1. git branch test
2. git checkout test
3. git push --set-upstream \<name> \<url>
4. git checkout - (切换到上一个分支)
5. git branch -d \<name> (删除)

## 标签

1. git tag (显示所有标签)
2. git tag [name]
3. git push origin [tagname]
4. git push origin :refs/tags/[tagName]

## 查看信息

1. git status (查看变更文件)
2. git log (查看分支日志)
3. git log --stat (查看 commit 历史)
4. git branch -r 查看当前代码在 git 服务器的分支列表

## 撤销

1. git reset [file](恢复暂存区到工作区)
2. git reset (恢复暂存区所有文件)
3. git reset [commit](恢复版本到指定commit)

## 提交流程

1. git add .
2. git commit -m 1
3. git push
