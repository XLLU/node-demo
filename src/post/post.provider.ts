export const sqlFragment = {
  user: `
    JSON_OBJECT(
      'id', user.id,
      'name', user.name
    ) as user
  `,
  leftJoinUser: `
    LEFT JOIN user 
    ON post.userid = user.id
  `,
  totalComments: `
    (SELECT COUNT(comment.id) from comment where post.id=comment.postId) as totalComments
  `,
  leftJoinOneFile: `
    LEFT JOIN LATERAL (SELECT * FROM file WHERE file.postId = post.id ORDER BY file.id DESC LIMIT 1) AS file
    ON file.postId = post.id
  `,
  leftJoinTwoFile: `
    LEFT JOIN LATERAL (SELECT * FROM file WHERE file.postId = post.id ORDER BY file.id DESC LIMIT 2) AS file
    ON file.postId = post.id
  `,
  files: `
    IF(COUNT(file.id), 
      JSON_ARRAYAGG(JSON_OBJECT(
        'id', file.id, 
        'width', file.width, 
        'height', file.height
      ))
    ,NULL) AS files
  `,
  leftJoinTag: `
    LEFT JOIN post_tag
    ON post_tag.postId = post.id
    LEFT JOIN tag
    ON tag.id = post_tag.tagId
  `,
  tags: `
    CAST(IF(COUNT(DISTINCT tag.id), 
      CONCAT('[', GROUP_CONCAT(JSON_OBJECT('id', tag.id, 'name', tag.name) ORDER BY tag.id ASC) , ']'),NULL)
    AS JSON) AS tags
  `,
};
