import { Injectable } from '@nestjs/common';
import sanitizeHtml from 'sanitize-html';


@Injectable()
export class SanitizerService {
  sanitize(input: string): string {
    return sanitizeHtml(input, {
      allowedTags: [], // Aucun tag autorisé (texte brut uniquement)
      allowedAttributes: {}, // Pas d'attributs autorisés
    });
  }
}