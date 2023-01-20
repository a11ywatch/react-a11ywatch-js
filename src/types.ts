export type Analytic = {
  __typename?: "Analytic";
  _id?: string;
  id?: string;
  pageUrl?: string;
  errorCount?: number;
  warningCount?: number;
  noticeCount?: number;
  errorOccurances?: string;
  userId?: number;
  domain?: string;
  accessScore?: number;
  totalIssues?: number;
};

export type Report = {
  url?: string;
  domain?: string;
  issues?: PageIssue[];
  cdnConnected?: boolean;
  issuesInfo?: IssueMeta;
  lastScanDate?: string;
  online?: boolean;
  pageLoadTime?: PageLoadTimeMeta;
  userId?: number;
};

// allow single report or a map of reports depending on multi prop
export type PageReport = Report | Map<string, Report> | null | undefined;

export type BasicMutationResponse = MutationResponse & {
  __typename?: "BasicMutationResponse";
  code: string;
  success: boolean;
  message: string;
};

export type CreatePageHeaders = {
  key: string;
  value: string;
};

export type History = {
  __typename?: "History";
  id?: string;
  url?: string;
  user?: User;
  issues?: Issue[];
  pages?: Pages[];
  userId?: number;
  domain?: string;
  cdnConnected?: boolean;
  pageLoadTime?: PageLoadTimeMeta;
  issuesInfo?: IssueMeta;
  pageInsights?: boolean;
  insight?: PageInsights;
};

export type HistoryIssuesArgs = {
  filter?: string;
};

// the accessibility issue details
export interface PageIssue {
  code: string;
  context: string;
  message: string;
  runner: string; // what what used for testing
  type: string;
  selector: string;
  typeCode: number;
  recurrence?: number; // amount of times issue appeared.
}

// TODO refactor
export interface Issue extends PageIssue {
  __typename?: "Issue";
  _id?: string; // gql id
  issue?: PageIssue;
  issues?: PageIssue[];
  domain?: string;
  pageUrl?: string;
}

// issue model reflection types
export interface IssueData {
  pageUrl: string;
  domain: string;
  issues: Partial<PageIssue[]>;
}

export type IssueIssuesArgs = {
  filter?: string;
};

export type IssueMeta = {
  __typename?: "IssueMeta";
  issuesFixedByCdn?: number;
  possibleIssuesFixedByCdn?: number;
  totalIssues?: number;
  cdnConnected?: boolean;
  skipContentIncluded?: boolean;
  errorCount?: number;
  warningCount?: number;
  noticeCount?: number;
  accessScore?: number;
  pageCount?: number;
  accessScoreAverage?: string; // todo: replace name to accessScore
};

export type Mutation = {
  __typename?: "Mutation";
  register?: User;
  login?: User;
  logout?: BasicMutationResponse;
  updateUser?: UpdateUserMutationResponse;
  toggleAlert?: UpdateUserMutationResponse;
  updateWebsite?: UpdateWebSiteMutationResponse;
  updateScript?: UpdateScriptMutationResponse;
  crawlWebsite?: UpdateWebSiteMutationResponse;
  scanWebsite?: UpdateWebSiteMutationResponse;
  forgotPassword?: User;
  confirmEmail?: UpdateUserMutationResponse;
  resetPassword?: User;
  addWebsite?: UpdateWebSiteMutationResponse;
  filterEmailDates?: User;
  removeWebsite?: UpdateWebSiteMutationResponse;
  addPaymentSubscription?: UpdateUserMutationResponse;
  cancelSubscription?: UpdateUserMutationResponse;
};

export type MutationRegisterArgs = {
  email: string;
  password?: string;
  googleId?: string;
};

export type MutationLoginArgs = {
  email: string;
  password?: string;
  googleId?: string;
};

export type MutationUpdateUserArgs = {
  password?: string;
  newPassword?: string;
};

export type MutationToggleAlertArgs = {
  alertEnabled?: boolean;
};

export type MutationUpdateWebsiteArgs = {
  url?: string;
  customHeaders?: CreatePageHeaders[];
  pageInsights?: boolean;
};

export type MutationUpdateScriptArgs = {
  url?: string;
  scriptMeta?: ScriptMetaInput;
  editScript?: boolean;
  newScript?: string;
};

export type MutationCrawlWebsiteArgs = {
  url?: string;
};

export type MutationScanWebsiteArgs = {
  url?: string;
};

export type MutationForgotPasswordArgs = {
  email?: string;
};

export type MutationConfirmEmailArgs = {
  email?: string;
};

export type MutationResetPasswordArgs = {
  email?: string;
  resetCode?: string;
  jwt?: string;
};

export type MutationAddWebsiteArgs = {
  url: string;
  customHeaders?: CreatePageHeaders[];
  pageInsights?: boolean;
};

export type MutationFilterEmailDatesArgs = {
  emailFilteredDates?: number[];
};

export type MutationRemoveWebsiteArgs = {
  url?: string;
  deleteMany?: boolean;
};

export type MutationAddPaymentSubscriptionArgs = {
  email?: string;
  stripeToken?: string;
  yearly?: boolean;
};

export type MutationCancelSubscriptionArgs = {
  email?: string;
};

export type MutationResponse = {
  code: string;
  success: boolean;
  message: string;
};

export type PageHeaders = {
  __typename?: "PageHeaders";
  key?: string;
  value?: string;
};

export type PageInsights = {
  __typename?: "PageInsights";
  json?: string;
};

export type PageLoadTimeMeta = {
  __typename?: "PageLoadTimeMeta";
  duration?: number;
  durationFormated?: string;
  color?: string;
};

export type PaymentPlan = {
  __typename?: "PaymentPlan";
  id?: string;
  object?: string;
  active?: boolean;
  amount?: number;
  amount_decimal?: string;
  nickname?: string;
  currency?: string;
  interval?: string;
  product?: string;
};

export type PaymentSubScription = {
  __typename?: "PaymentSubScription";
  id?: string;
  object?: string;
  application_fee_percent?: number;
  billing_cycle_anchor?: number;
  cancel_at_period_end?: boolean;
  customer?: string;
  ended_at?: string;
  canceled_at?: string;
  status?: string;
  start_date?: string;
  plan?: PaymentPlan;
  days_until_due?: string;
  current_period_end?: string;
  current_period_start?: string;
  created?: string;
  collection_method?: string;
};

export type Query = {
  __typename?: "Query";
  websites?: Website[];
  website?: Website;
  pages?: Pages[];
  issues?: Issue[];
  history?: History[];
  analytics?: Analytic[];
  scripts?: Script[];
  script?: Script;
  issue?: Issue;
  user?: User;
};

export type QueryWebsitesArgs = {
  filter?: string;
};

export type QueryWebsiteArgs = {
  url?: string;
};

export type QuerySubDomainsArgs = {
  filter?: string;
};

export type QueryIssuesArgs = {
  filter?: string;
};

export type QueryHistoryArgs = {
  filter?: string;
};

export type QueryAnalyticsArgs = {
  filter?: string;
};

export type QueryScriptsArgs = {
  filter?: string;
};

export type QueryScriptArgs = {
  filter?: string;
  url?: string;
};

export type QueryIssueArgs = {
  url?: string;
};

export type ScanInformation = {
  __typename?: "ScanInformation";
  lastScanDate?: string;
  totalUptime?: number;
};

export type Script = {
  __typename?: "Script";
  id?: string;
  pageUrl?: string;
  domain?: string;
  script?: string;
  cdnUrl?: string;
  cdnUrlMinified?: string;
  cdnConnected?: boolean;
  issueMeta?: IssueMeta;
  scriptMeta?: ScriptMeta;
};

export type ScriptMeta = {
  __typename?: "ScriptMeta";
  skipContentEnabled?: boolean;
  translateEnabled?: boolean;
};

export type ScriptMetaInput = {
  skipContentEnabled?: boolean;
  translateEnabled?: boolean;
};

export type Pages = {
  __typename?: "Pages";
  id?: string;
  url?: string;
  user?: User;
  domain?: string;
  userId?: number;
  cdnConnected?: boolean;
  pageLoadTime?: PageLoadTimeMeta;
  issues?: Issue[];
  issuesInfo?: IssueMeta;
  pageInsights?: boolean;
  insight?: PageInsights;
};

export type SubDomainIssuesArgs = {
  filter?: string;
};

export type Subscription = {
  __typename?: "Subscription";
  websiteAdded?: Website;
  issueAdded?: Issue;
  emailVerified?: User;
  websiteRemoved?: Website;
};

export type SubscriptionWebsiteAddedArgs = {};

export type SubscriptionIssueAddedArgs = {};

export type SubscriptionEmailVerifiedArgs = {};

export type UpdateScriptMutationResponse = MutationResponse & {
  __typename?: "UpdateScriptMutationResponse";
  code: string;
  success: boolean;
  message: string;
  script?: Script;
};

export type UpdateUserMutationResponse = MutationResponse & {
  __typename?: "UpdateUserMutationResponse";
  code: string;
  success: boolean;
  message: string;
  user?: User;
  alertEnabled?: boolean;
  profileVisible?: boolean;
};

// stripe billing info
export type Invoice = {
  next_payment_attempt?: string;
  amount_due: string;
  amount_paid: string;
  total: string;
  billing_reason: string;
};

export type UpdateWebSiteMutationResponse = MutationResponse & {
  __typename?: "UpdateWebSiteMutationResponse";
  code: string;
  success: boolean;
  message: string;
  website?: Website;
};

export type User = {
  __typename?: "User";
  id?: number;
  email?: string;
  password?: string;
  jwt?: string;
  salt?: string;
  loggedIn?: boolean;
  passwordRequired?: boolean;
  alertEnabled?: boolean;
  lastAlertSent?: number;
  role?: number;
  activeSubscription?: boolean;
  emailConfirmed?: boolean;
  emailFilteredDates?: number[];
  emailMorningOnly?: boolean;
  websites?: Website[];
  profileVisible?: boolean;
  history?: History[];
  scanInfo?: ScanInformation;
  analytics?: Analytic[];
  scripts?: Script[];
  script?: Script;
  paymentSubscription?: PaymentSubScription;
  pageSpeedApiKey?: string;
  websiteLimit?: number;
  downAlerts?: Website[];
  googleId?: string;
  emailExpDate?: string;
  resetCode?: string;
  stripeID?: string;
  invoice?: Invoice;
};

export type UserAnalyticsArgs = {
  filter?: string;
};

export type UserScriptsArgs = {
  filter?: string;
};

export type UserScriptArgs = {
  filter?: string;
  url?: string;
};

export type Website = {
  __typename?: "Website";
  _id?: string;
  url?: string;
  user?: User;
  userId?: number;
  domain: string;
  cdnConnected?: boolean;
  pageLoadTime?: PageLoadTimeMeta;
  issues?: Issue;
  issue?: PageIssue[];
  issuesInfo?: IssueMeta;
  pages?: Pages;
  script?: Script;
  lastScanDate?: string;
  cdn?: string;
  pageHeaders?: PageHeaders[];
  online?: boolean;
  timestamp?: string;
  pageInsights?: boolean;
  insight?: PageInsights;
  subdomains?: boolean;
  robots?: boolean;
  tld?: boolean;
  shutdown?: boolean; // did the website complete the scan
  verified?: boolean; // website verified
  verificationCode?: string; // txt record to verify dns
  mobile?: boolean;
  ua?: string;
  actionsEnabled?: boolean;
  actions?: any[];
  standard?: "WCAG2A" | "WCAG2AA" | "WCAG2AAA" | "Section508";
  proxy?: string; // proxy for request.
};

export type WebsiteIssuesArgs = {
  filter?: string;
};
