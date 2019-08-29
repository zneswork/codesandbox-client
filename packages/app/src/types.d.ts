export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Collection = {
  __typename?: 'Collection';
  id?: Maybe<Scalars['ID']>;
  path?: Maybe<Scalars['String']>;
  sandboxes?: Maybe<Array<Maybe<Sandbox>>>;
  teamId?: Maybe<Scalars['ID']>;
  user?: Maybe<User>;
};

export type CurrentUser = {
  __typename?: 'CurrentUser';
  collection?: Maybe<Collection>;
  collections?: Maybe<Array<Maybe<Collection>>>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  followedTemplates?: Maybe<Array<Maybe<Template>>>;
  id?: Maybe<Scalars['ID']>;
  lastName?: Maybe<Scalars['String']>;
  notifications?: Maybe<Array<Maybe<Notification>>>;
  sandboxes?: Maybe<Array<Maybe<Sandbox>>>;
  team?: Maybe<Team>;
  teams?: Maybe<Array<Maybe<Team>>>;
  templates?: Maybe<Array<Maybe<Template>>>;
  username?: Maybe<Scalars['String']>;
};

export type CurrentUserCollectionArgs = {
  path: Scalars['String'];
  teamId?: Maybe<Scalars['ID']>;
};

export type CurrentUserCollectionsArgs = {
  teamId?: Maybe<Scalars['ID']>;
};

export type CurrentUserNotificationsArgs = {
  limit?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<OrderBy>;
};

export type CurrentUserSandboxesArgs = {
  limit?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<OrderBy>;
  showDeleted?: Maybe<Scalars['Boolean']>;
};

export type CurrentUserTeamArgs = {
  id: Scalars['ID'];
};

export type CurrentUserTemplatesArgs = {
  showAll?: Maybe<Scalars['Boolean']>;
  teamId?: Maybe<Scalars['ID']>;
};

export enum Direction {
  Asc = 'ASC',
  Desc = 'DESC',
}

/** A team or the current user */
export type FollowEntity = User | Team;

export type Following = {
  __typename?: 'Following';
  entity?: Maybe<FollowEntity>;
  isFollowing?: Maybe<Scalars['Boolean']>;
};

export type Notification = {
  __typename?: 'Notification';
  data?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  read?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
};

export type OrderBy = {
  direction: Direction;
  field: Scalars['String'];
};

export type RootMutationType = {
  __typename?: 'RootMutationType';
  /** Accept an invitation to a team */
  acceptTeamInvitation?: Maybe<Team>;
  /** Add sandboxes to a collection */
  addToCollection?: Maybe<Collection>;
  /** Clear notification unread count */
  clearNotificationCount?: Maybe<User>;
  /** Create a collection */
  createCollection?: Maybe<Collection>;
  /** Create a team */
  createTeam?: Maybe<Team>;
  /** Delete a collection and all subfolders */
  deleteCollection?: Maybe<Array<Maybe<Collection>>>;
  /** Delete sandboxes */
  deleteSandboxes?: Maybe<Array<Maybe<Sandbox>>>;
  /** Follow a template */
  followTemplate?: Maybe<Template>;
  /** Invite someone to a team */
  inviteToTeam?: Maybe<Team>;
  /** Leave a team */
  leaveTeam?: Maybe<Scalars['String']>;
  /** Make templates from sandboxes */
  makeSandboxesTemplates?: Maybe<Array<Maybe<Template>>>;
  permanentlyDeleteSandboxes?: Maybe<Array<Maybe<Sandbox>>>;
  /** Reject an invitation to a team */
  rejectTeamInvitation?: Maybe<Scalars['String']>;
  /** Remove someone from a team */
  removeFromTeam?: Maybe<Team>;
  /** Rename a collection and all subfolders */
  renameCollection?: Maybe<Array<Maybe<Collection>>>;
  renameSandbox?: Maybe<Sandbox>;
  /** Revoke an invitation to a team */
  revokeTeamInvitation?: Maybe<Team>;
  setSandboxesPrivacy?: Maybe<Array<Maybe<Sandbox>>>;
  /** Set the description of the team */
  setTeamDescription?: Maybe<Team>;
  /** Unfollow a template */
  unfollowTemplate?: Maybe<Template>;
  /** Convert templates back to sandboxes */
  unmakeSandboxesTemplates?: Maybe<Array<Maybe<Template>>>;
};

export type RootMutationTypeAcceptTeamInvitationArgs = {
  teamId: Scalars['ID'];
};

export type RootMutationTypeAddToCollectionArgs = {
  collectionPath: Scalars['String'];
  sandboxIds: Array<Maybe<Scalars['ID']>>;
  teamId?: Maybe<Scalars['ID']>;
};

export type RootMutationTypeCreateCollectionArgs = {
  path: Scalars['String'];
  teamId?: Maybe<Scalars['ID']>;
};

export type RootMutationTypeCreateTeamArgs = {
  name: Scalars['String'];
};

export type RootMutationTypeDeleteCollectionArgs = {
  path: Scalars['String'];
  teamId?: Maybe<Scalars['ID']>;
};

export type RootMutationTypeDeleteSandboxesArgs = {
  sandboxIds: Array<Maybe<Scalars['ID']>>;
};

export type RootMutationTypeFollowTemplateArgs = {
  teamId?: Maybe<Scalars['ID']>;
  templateId: Scalars['ID'];
};

export type RootMutationTypeInviteToTeamArgs = {
  teamId: Scalars['ID'];
  username?: Maybe<Scalars['String']>;
};

export type RootMutationTypeLeaveTeamArgs = {
  teamId: Scalars['ID'];
};

export type RootMutationTypeMakeSandboxesTemplatesArgs = {
  sandboxIds: Array<Maybe<Scalars['ID']>>;
};

export type RootMutationTypePermanentlyDeleteSandboxesArgs = {
  sandboxIds: Array<Maybe<Scalars['ID']>>;
};

export type RootMutationTypeRejectTeamInvitationArgs = {
  teamId: Scalars['ID'];
};

export type RootMutationTypeRemoveFromTeamArgs = {
  teamId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type RootMutationTypeRenameCollectionArgs = {
  newPath: Scalars['String'];
  newTeamId?: Maybe<Scalars['ID']>;
  path: Scalars['String'];
  teamId?: Maybe<Scalars['ID']>;
};

export type RootMutationTypeRenameSandboxArgs = {
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type RootMutationTypeRevokeTeamInvitationArgs = {
  teamId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type RootMutationTypeSetSandboxesPrivacyArgs = {
  privacy?: Maybe<Scalars['Int']>;
  sandboxIds: Array<Maybe<Scalars['ID']>>;
};

export type RootMutationTypeSetTeamDescriptionArgs = {
  description: Scalars['String'];
  teamId: Scalars['ID'];
};

export type RootMutationTypeUnfollowTemplateArgs = {
  teamId?: Maybe<Scalars['ID']>;
  templateId: Scalars['ID'];
};

export type RootMutationTypeUnmakeSandboxesTemplatesArgs = {
  sandboxIds: Array<Maybe<Scalars['ID']>>;
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  /** Get current user */
  me?: Maybe<CurrentUser>;
  /** Get a sandbox */
  sandbox?: Maybe<Sandbox>;
};

export type RootQueryTypeSandboxArgs = {
  sandboxId: Scalars['ID'];
};

/** A Sandbox */
export type Sandbox = {
  __typename?: 'Sandbox';
  alias?: Maybe<Scalars['String']>;
  author?: Maybe<User>;
  collection?: Maybe<Collection>;
  /** If the sandbox is a template this will be set */
  customTemplate?: Maybe<Template>;
  description?: Maybe<Scalars['String']>;
  forkedTemplate?: Maybe<Template>;
  id?: Maybe<Scalars['ID']>;
  insertedAt?: Maybe<Scalars['String']>;
  privacy?: Maybe<Scalars['Int']>;
  removedAt?: Maybe<Scalars['String']>;
  screenshotUrl?: Maybe<Scalars['String']>;
  source?: Maybe<Source>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type Source = {
  __typename?: 'Source';
  id?: Maybe<Scalars['ID']>;
  template?: Maybe<Scalars['String']>;
};

export type Team = {
  __typename?: 'Team';
  collections?: Maybe<Array<Maybe<Collection>>>;
  creatorId?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  followedTemplates?: Maybe<Array<Maybe<Template>>>;
  id?: Maybe<Scalars['ID']>;
  invitees?: Maybe<Array<Maybe<User>>>;
  name?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<User>>>;
};

/** A Template */
export type Template = {
  __typename?: 'Template';
  color?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  following?: Maybe<Array<Maybe<Following>>>;
  iconUrl?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  insertedAt?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['Boolean']>;
  sandbox?: Maybe<Sandbox>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

/** A CodeSandbox User */
export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  lastName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

declare module '*/Sandbox.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const Sandbox: DocumentNode;

  export default defaultDocument;
}

declare module '*/SidebarCollection.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const SidebarCollection: DocumentNode;

  export default defaultDocument;
}

declare module '*/Team.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const Team: DocumentNode;

  export default defaultDocument;
}

declare module '*/AcceptTeamInvitation.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const AcceptTeamInvitation: DocumentNode;

  export default defaultDocument;
}

declare module '*/AddToCollection.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const AddToCollection: DocumentNode;

  export default defaultDocument;
}

declare module '*/CreateCollection.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const CreateCollection: DocumentNode;

  export default defaultDocument;
}

declare module '*/CreateTeam.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const CreateTeam: DocumentNode;

  export default defaultDocument;
}

declare module '*/DeleteCollection.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const DeleteCollection: DocumentNode;

  export default defaultDocument;
}

declare module '*/DeleteSandboxes.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const DeleteSandboxes: DocumentNode;

  export default defaultDocument;
}

declare module '*/InviteToTeam.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const InviteToTeam: DocumentNode;

  export default defaultDocument;
}

declare module '*/LeaveTeam.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const LeaveTeam: DocumentNode;

  export default defaultDocument;
}

declare module '*/MakeSandboxesTemplate.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const MakeSandboxesTemplate: DocumentNode;

  export default defaultDocument;
}

declare module '*/PermanentlyDeleteSandboxes.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const PermanentlyDeleteSandboxes: DocumentNode;

  export default defaultDocument;
}

declare module '*/RejectTeamInvitation.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const RejectTeamInvitation: DocumentNode;

  export default defaultDocument;
}

declare module '*/RemoveFromTeam.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const RemoveFromTeam: DocumentNode;

  export default defaultDocument;
}

declare module '*/RenameCollection.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const RenameCollection: DocumentNode;

  export default defaultDocument;
}

declare module '*/RenameSandbox.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const RenameSandbox: DocumentNode;

  export default defaultDocument;
}

declare module '*/RevokeTeamInvitation.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const RevokeTeamInvitation: DocumentNode;

  export default defaultDocument;
}

declare module '*/SetSandboxesPrivacy.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const SetSandboxesPrivacy: DocumentNode;

  export default defaultDocument;
}

declare module '*/SetTeamDescription.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const SetTeamDescription: DocumentNode;

  export default defaultDocument;
}

declare module '*/UnmakeSandboxesTemplate.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const UnmakeSandboxesTemplate: DocumentNode;

  export default defaultDocument;
}

declare module '*/DeletedSandboxes.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const DeletedSandboxes: DocumentNode;

  export default defaultDocument;
}

declare module '*/GetTeam.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetTeam: DocumentNode;

  export default defaultDocument;
}

declare module '*/ListTemplates.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const ListTemplates: DocumentNode;

  export default defaultDocument;
}

declare module '*/PathedSandboxes.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const PathedSandboxes: DocumentNode;

  export default defaultDocument;
}

declare module '*/PathedSandboxesFolders.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const PathedSandboxesFolders: DocumentNode;

  export default defaultDocument;
}

declare module '*/RecentSandboxes.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const RecentSandboxes: DocumentNode;

  export default defaultDocument;
}

declare module '*/SearchSandboxes.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const SearchSandboxes: DocumentNode;

  export default defaultDocument;
}

declare module '*/TeamsSidebar.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const TeamsSidebar: DocumentNode;

  export default defaultDocument;
}
