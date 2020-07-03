"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonSchema = void 0;
const mongoose = require("mongoose");
exports.PokemonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    firstType: [{ type: mongoose.Schema.Types.ObjectId, ref: 'type' }],
    secondType: [{ type: mongoose.Schema.Types.ObjectId, ref: 'type' }],
    trainer: [{ type: mongoose.Schema.Types.ObjectId, ref: 'trainer' }]
});
//# sourceMappingURL=pokemon.schema.js.map