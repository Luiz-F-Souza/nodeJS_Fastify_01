"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.alterTable('transactions', (table) => {
        table.uuid('session_id').after('id').index();
        // index() é adicionado para que o DB agilize a busca naquele campo em específico. UTILIZAR APENAS QUANDO FOR BUSCAR MT POR UM CAMPO EM ESPECÍFICO
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.alterTable('transactions', (table) => {
        table.dropColumn('session_id');
    });
}
exports.down = down;
