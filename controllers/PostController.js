const pool = require('../database')

const createPost = async (req, res) => {
  const payload = req.body
  const query =
    'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *' //consulta sql
  const values = [
    payload.titulo,
    payload.img,
    payload.descripcion,
    payload.likes,
  ] //los valores que se van a insertar en la base de datos de esta forma se evita el sql injection
  const result = await pool.query(query, values)
  res.json(result.rows)
}

const getPosts = async (req, res) => {
  let filtros = ''
  let sql = 'SELECT * FROM posts'

  if (req.query.titulo?.length > 0) {
    filtros += ` titulo = '${req.query.titulo}' `
  }

  if (filtros.length > 0) {
    sql += ` WHERE ${filtros}`
  }

  const { rows } = await pool.query(sql)
  res.json(rows)
}

module.exports = {
  createPost,
  getPosts,
}
