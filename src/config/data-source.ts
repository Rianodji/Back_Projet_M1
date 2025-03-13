import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import {User} from '../users/entities/user.entity'; // Chemin relatif correct
import { Role } from '../role/entities/role.entity';
import { League } from 'league/entities/league.entity';
import { Arbitre } from 'arbitre/entities/arbitre.entity';
import { Arbitrage } from 'saison/entities/arbitrage.entity';
import { Equipe } from 'equipes/entities/equipes.entity';
import { MatchEquipe } from 'equipes/entities/match-equipe.entity';
import { Inscription } from 'inscription/entities/inscription.entity';
import { Joueur } from 'joueur/entities/joueur.entity';
import { Indisponibilite } from 'joueur/entities/indisponibilite.entity';
import { Journee } from 'journee/entities/journee.entity';
import { Match } from 'match/entities/match.entity';
import { MatchArbitre } from 'match/entities/match-arbitre.entity';
import { Saison } from 'saison/entities/saison.entity';
import { Selection } from 'selection/entities/selection.entity';

dotenv.config();

export const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  entities: [User,Role,League,Arbitre,Arbitrage,Equipe,MatchEquipe,Inscription,Joueur,Indisponibilite,Journee,Match,MatchArbitre,Saison,Selection],
  migrations: [__dirname + '/../migrations/*.ts'],  // Corrige également le chemin des migrations
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production',
});