"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainerSchema = void 0;
const mongoose = require("mongoose");
exports.TrainerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    boxes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'box' }]
});
//# sourceMappingURL=trainer.schema.js.map