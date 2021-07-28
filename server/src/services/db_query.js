const TRG_register = `CREATE TRIGGER add_register AFTER INSERT ON produtos FOR EACH ROW INSERT registros(id_pd,nome, descricao, preco, createdAt, updatedAt)VALUES(new.id, new.nome, new.descricao, new.preco, new.createdAt, new.updatedAt)`;

const TRG_edited = `CREATE TRIGGER add_edited AFTER UPDATE ON produtos FOR EACH ROW INSERT editados(id_pd ,nome, descricao, preco, createdAt, updatedAt)VALUES(new.id, new.nome, new.descricao, new.preco, new.createdAt, new.updatedAt)`;

const TRG_deleted = `CREATE TRIGGER add_deleted AFTER DELETE ON produtos FOR EACH ROW INSERT apagados(id_pd, nome, descricao, preco, createdAt, updatedAt)VALUES(old.id, old.nome, old.descricao, old.preco, old.createdAt, old.updatedAt)`;

const Exits = `SHOW TRIGGERS;`;

module.exports = { TRG_register, TRG_edited, TRG_deleted, Exits }
