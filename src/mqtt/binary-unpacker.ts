import { Injectable } from '@nestjs/common';

@Injectable()
export class BinaryUnpacker {
  // Define o formato da mensagem binária
  private readonly packetFormat = {
    machineId: { offset: 0, length: 2, type: 'uint16' }, // 16 bits (unsigned)
    sensorId: { offset: 2, length: 2, type: 'uint16' },  // 16 bits (unsigned)
    intValue: { offset: 4, length: 2, type: 'int16' },   // 16 bits (signed)
    conversionValue: { offset: 6, length: 2, type: 'uint16' }, // 16 bits (unsigned)
    day: { offset: 8, length: 1, type: 'uint8' },        // 8 bits (unsigned)
    month: { offset: 9, length: 1, type: 'uint8' },      // 8 bits (unsigned)
    year: { offset: 10, length: 2, type: 'uint16' },     // 16 bits (unsigned)
    hour: { offset: 12, length: 1, type: 'uint8' },      // 8 bits (unsigned)
    minute: { offset: 13, length: 1, type: 'uint8' },    // 8 bits (unsigned)
    second: { offset: 14, length: 1, type: 'uint8' },    // 8 bits (unsigned)
  };

   /**
   * Realiza o unpack de um buffer binário e retorna um objeto interpretado.
   * @param buffer Buffer contendo os dados binários.
   * @returns Objeto com os campos descompactados.
   */
  unpack(buffer: Buffer): Record<string, any> {
    if (!Buffer.isBuffer(buffer)) {
      throw new Error('Input must be a Buffer');
    }

    const result: Record<string, any> = {};

    // Descompacta cada campo com base no formato definido
    for (const [key, { offset, type }] of Object.entries(this.packetFormat)) {
      switch (type) {
        case 'uint8':
          result[key] = buffer.readUInt8(offset);
          break;
        case 'int8':
          result[key] = buffer.readInt8(offset);
          break;
        case 'uint16':
          result[key] = buffer.readUInt16BE(offset);
          break;
        case 'int16':
          result[key] = buffer.readInt16BE(offset);
          break;
        default:
          throw new Error(`Unsupported type: ${type}`);
      }
    }

    return result;
  }
}

export default BinaryUnpacker;
