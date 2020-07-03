"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoxSchema = void 0;
const mongoose = require("mongoose");
exports.BoxSchema = new mongoose.Schema({
    name: { type: String, required: true },
    pokemons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'pokemon' }]
});
//# sourceMappingURL=box.schema.js.map