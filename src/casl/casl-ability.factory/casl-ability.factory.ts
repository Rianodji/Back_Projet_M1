import { Injectable } from '@nestjs/common';
import { AbilityBuilder, createMongoAbility, MongoAbility, InferSubjects, ExtractSubjectType } from '@casl/ability';
import { Action } from '../enums/action.enum';
import { LeagueInterface } from '../interfaces/league.interface'; 
import { UserInterface } from '../interfaces/user.interface';
import { JoueurInterface } from '../interfaces/joueur.interface';

// Définition des sujets pouvant être contrôlés par les permissions CASL
type Subjects = InferSubjects<typeof LeagueInterface | typeof UserInterface > | 'all';
export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  
  /**
   * Crée les permissions pour un utilisateur donné en fonction de son rôle.
   * @param user L'utilisateur pour lequel on génère les permissions.
   * @returns Une instance de `AppAbility` définissant les actions autorisées et interdites.
   */
  createForUser(user: UserInterface): AppAbility {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    // Si l'utilisateur n'est pas authentifié, on lui donne un accès limité
    if (!user) {
      can(Action.Read, LeagueInterface);
      cannot(Action.Read, UserInterface);
    } else {
      // Attribution des permissions en fonction du rôle de l'utilisateur
      if (user.roles.includes("admin")) {
        // L'administrateur a un accès total sur les ligues et les utilisateurs
        can(Action.Manage, LeagueInterface);
        can(Action.Manage, UserInterface);
        can(Action.Manage, JoueurInterface);
      } else if (user.roles.includes("manager")) {
        // Le manager peut lire et mettre à jour ses informations, mais ne peut pas supprimer son compte
        can(Action.Read, UserInterface, { id: user.id });
        can(Action.Update, UserInterface, { id: user.id });
        can(Action.Update, LeagueInterface, { userId: user.id });
        can(Action.Delete, LeagueInterface, { userId: user.id });
        can(Action.Read, LeagueInterface, { userId: user.id });
        can(Action.Create, LeagueInterface);
        cannot(Action.Delete, UserInterface);
      } else {
        // Un utilisateur standard peut lire et mettre à jour ses informations, mais ne peut pas supprimer son compte
        can(Action.Read, UserInterface, { id: user.id });
        can(Action.Update, UserInterface, { id: user.id });
        can(Action.Read, LeagueInterface);
        cannot(Action.Update, LeagueInterface);
        cannot(Action.Delete, LeagueInterface);
        cannot(Action.Delete, UserInterface);
        cannot(Action.Create, LeagueInterface); 
      }
    }

    // Construction de l'objet de permissions en spécifiant la méthode de détection du type de sujet
    return build({
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
