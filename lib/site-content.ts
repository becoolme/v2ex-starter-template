import {
  REPOSITORY_URL,
  TOKEN_ADDRESS,
  TOKEN_DECIMALS,
  TOKEN_EXPLORER_URL,
  TOKEN_PROGRAM_ID,
  V2EX_PROFILE_URL,
  X_URL,
  type Locale,
} from './seo';

export const seoCopy = {
  zh: {
    homeTitle: 'V2EX Starter Template | Solana V2EX 开发模板',
    homeDescription:
      '面向开发者的 Next.js 与 Solana 起步模板，支持钱包连接、V2EX 或 SOL 支付、余额查询、交易检查、消息签名与验签。',
    faqTitle: 'V2EX Starter Template 常见问题',
    faqDescription:
      '了解 V2EX 代币地址、Solana 网络、钱包连接、支付、余额查询、签名验签和私有 RPC 使用建议。',
    changelogTitle: 'V2EX Starter Template 更新记录',
    changelogDescription:
      '查看 V2EX Starter Template 面向用户的页面、发现能力和演示体验更新。',
    notFoundTitle: '页面未找到 | V2EX Starter Template',
    notFoundDescription:
      '这个 V2EX Starter Template 页面不存在。返回首页、FAQ 或 GitHub 仓库继续查看。',
  },
  en: {
    homeTitle: 'V2EX Starter Template | Solana V2EX Developer Template',
    homeDescription:
      'A Next.js and Solana starter template for wallet connection, V2EX or SOL payments, balance queries, transaction inspection, message signing, and signature verification.',
    faqTitle: 'V2EX Starter Template FAQ',
    faqDescription:
      'Learn about the V2EX token address, Solana network, wallet connection, payments, balance queries, signature verification, and private RPC guidance.',
    changelogTitle: 'V2EX Starter Template Changelog',
    changelogDescription:
      'User-facing updates for V2EX Starter Template pages, discoverability, and demo experience.',
    notFoundTitle: 'Page Not Found | V2EX Starter Template',
    notFoundDescription:
      'This V2EX Starter Template page does not exist. Return to the homepage, FAQ, or GitHub repository.',
  },
} as const satisfies Record<Locale, Record<string, string>>;

export const homeCopy = {
  zh: {
    title: '$V2EX 开发模板',
    subtitle: 'Solana 主网开发工具包',
    summary:
      'V2EX Starter Template 帮助开发者在 Next.js 应用中快速接入 Solana 钱包、V2EX 或 SOL 支付、余额查询、交易检查、消息签名与后端验签。',
    installLabel: '快速开始',
    installCmd: `$ git clone ${REPOSITORY_URL}.git
$ cp .env.local.example .env.local
$ pnpm install
$ pnpm dev`,
    languageLink: 'English',
    languageHref: '/en',
    configuration: '配置',
    configIntro: '在 .env.local 中配置 RPC 与 V2EX token 地址。生产环境建议使用私有 RPC。',
    configNote: '配置请在 .env.local 中设置',
    rpcNote: '需要使用私有 RPC 服务，公共 RPC 有速率限制',
    rpcProviders: 'RPC 服务商：Alchemy、QuickNode、Helius 等',
    tokenFacts: 'V2EX 代币事实',
    tokenFactsIntro:
      'V2EX 是 Solana 主网上的 SPL Token。本模板用它演示代币支付、余额查询和交易检查。',
    tokenName: 'Token 名称',
    tokenNameValue: 'V2EX, Solana SPL Token',
    tokenAddress: '合约地址',
    tokenDecimals: '小数位',
    tokenNetwork: '网络',
    tokenNetworkValue: 'Solana Mainnet Beta',
    tokenProgram: 'SPL Token Program',
    officialRepo: '官方仓库',
    wallet: '钱包',
    walletPurpose: '连接 Phantom 或 Solflare 等 Solana 钱包，并读取当前地址的 V2EX 余额。',
    walletStatus: '状态',
    connected: '已连接',
    disconnected: '未连接',
    balance: '余额',
    connect: '连接',
    disconnect: '断开',
    send: '发送 V2EX 或 SOL',
    sendPurpose: '输入接收地址、金额和可选 memo，调用前端 SDK 发起钱包签名交易。',
    sendV2ex: '发送 V2EX',
    sendSol: '发送 SOL',
    queryBalance: '查询余额',
    queryPurpose: '用后端 SDK 查询任意 Solana 地址的 V2EX 余额。',
    query: '查询',
    inspectTransaction: '检查交易',
    inspectPurpose: '根据交易签名读取状态、转账类型、金额、memo、发送方和接收方。',
    inspect: '检查',
    sign: '签名',
    signPurpose: '用钱包签名消息，再把消息、签名和公钥交给后端验签。',
    verify: '验证',
    verifySignature: '验证签名',
    signatureExplanation:
      '数字签名可用于验证钱包所有权。建议在消息中包含当前时间戳或 nonce，避免签名被重复使用。',
    recipientAddress: '接收地址',
    amount: '数量',
    memo: 'Memo，可选',
    memoHint: 'memo 可用于关联订单号或备注信息',
    solanaAddress: 'Solana 地址',
    transactionSignature: '交易哈希',
    messageToSign: '待签名消息',
    signature: '签名',
    message: '消息',
    publicKey: '公钥',
    walletNotConnected: '钱包未连接',
    missingRequiredFields: '错误：缺少必填字段',
    invalidAmount: '错误：请输入有效金额',
    sendingV2exPayment: '正在发送 V2EX 付款...',
    sendingSolPayment: '正在发送 SOL 付款...',
    v2exTxSent: 'V2EX 交易已发送',
    solTxSent: 'SOL 交易已发送',
    v2exPaymentFailed: 'V2EX 付款失败',
    solPaymentFailed: 'SOL 付款失败',
    connectingWallet: '正在连接钱包...',
    walletConnectedSuccessfully: '钱包连接成功',
    failedToConnectWallet: '钱包连接失败',
    walletDisconnected: '钱包已断开',
    failedToDisconnect: '断开失败',
    checkingBalance: '正在查询余额...',
    failedToGetBalance: '获取余额失败',
    failedToCheckBalance: '查询余额失败',
    pleaseEnterAddress: '请输入地址',
    pleaseEnterTransactionSignature: '请输入交易签名',
    gettingTransactionDetails: '正在获取交易详情...',
    txStatus: '状态',
    txType: '类型',
    txAmount: '金额',
    txMemo: 'Memo',
    from: '发送方',
    to: '接收方',
    timestamp: '时间戳',
    transactionNotFound: '未找到交易',
    failedToGetTransaction: '获取交易失败',
    signingMessage: '正在签名消息...',
    messageCannotBeEmpty: '错误：消息不能为空',
    signFailed: '签名失败',
    verifyingSignature: '正在验证签名...',
    allFieldsRequired: '错误：所有字段都是必填的',
    verification: '验证',
    valid: '有效',
    invalid: '无效',
    verificationFailed: '验证失败',
    verifyFailed: '验证失败',
    transactionTip: '只有经过后端检查后，才能认为交易成功。',
    balanceFor: '地址余额',
    faqTitle: '常见问题',
    faqIntro: '这些问题覆盖代币地址、模板用途、支付、余额查询、签名验签和 RPC 使用边界。',
    fullFaqLink: '查看完整 FAQ',
    disclaimer:
      '本项目是开发者示例，不构成投资建议。请勿在示例站点连接主钱包或输入无法承担风险的钱包资产。',
    footerRepo: 'GitHub 仓库：becoolme/v2ex-starter-template',
    footerX: 'X：@becool_me',
    footerV2ex: 'V2EX：BeCool',
    changelog: '更新记录',
  },
  en: {
    title: '$V2EX starter template',
    subtitle: 'Solana mainnet developer toolkit',
    summary:
      'V2EX Starter Template helps developers add Solana wallet connection, V2EX or SOL payments, balance queries, transaction inspection, message signing, and backend signature verification to a Next.js app.',
    installLabel: 'Quick start',
    installCmd: `$ git clone ${REPOSITORY_URL}.git
$ cp .env.local.example .env.local
$ pnpm install
$ pnpm dev`,
    languageLink: '中文',
    languageHref: '/',
    configuration: 'Configuration',
    configIntro: 'Set the RPC URL and V2EX token address in .env.local. Use a private RPC in production.',
    configNote: 'Configure these values in .env.local',
    rpcNote: 'Use a private RPC service. Public RPC endpoints have rate limits.',
    rpcProviders: 'RPC providers: Alchemy, QuickNode, Helius, and similar services',
    tokenFacts: 'V2EX token facts',
    tokenFactsIntro:
      'V2EX is an SPL Token on Solana mainnet. This template uses it to demonstrate token payments, balance queries, and transaction inspection.',
    tokenName: 'Token name',
    tokenNameValue: 'V2EX, Solana SPL Token',
    tokenAddress: 'Contract address',
    tokenDecimals: 'Decimals',
    tokenNetwork: 'Network',
    tokenNetworkValue: 'Solana Mainnet Beta',
    tokenProgram: 'SPL Token Program',
    officialRepo: 'Official repository',
    wallet: 'Wallet',
    walletPurpose: 'Connect a Solana wallet such as Phantom or Solflare and read the current V2EX balance.',
    walletStatus: 'Status',
    connected: 'Connected',
    disconnected: 'Disconnected',
    balance: 'Balance',
    connect: 'Connect',
    disconnect: 'Disconnect',
    send: 'Send V2EX or SOL',
    sendPurpose: 'Enter a recipient address, amount, and optional memo, then use the frontend SDK to request a wallet-signed transaction.',
    sendV2ex: 'Send V2EX',
    sendSol: 'Send SOL',
    queryBalance: 'Query balance',
    queryPurpose: 'Use the backend SDK to query the V2EX balance for any Solana address.',
    query: 'Query',
    inspectTransaction: 'Inspect transaction',
    inspectPurpose: 'Read status, transfer type, amount, memo, sender, and recipient from a transaction signature.',
    inspect: 'Inspect',
    sign: 'Sign',
    signPurpose: 'Sign a message with the wallet, then send the message, signature, and public key to the backend verifier.',
    verify: 'Verify',
    verifySignature: 'Verify signature',
    signatureExplanation:
      'Digital signatures can verify wallet ownership. Include a current timestamp or nonce in the message so the signature cannot be reused.',
    recipientAddress: 'Recipient address',
    amount: 'Amount',
    memo: 'Memo, optional',
    memoHint: 'Memo can be used for an order number or note',
    solanaAddress: 'Solana address',
    transactionSignature: 'Transaction hash',
    messageToSign: 'Message to sign',
    signature: 'Signature',
    message: 'Message',
    publicKey: 'Public key',
    walletNotConnected: 'Wallet not connected',
    missingRequiredFields: 'Error: missing required fields',
    invalidAmount: 'Error: enter a valid amount',
    sendingV2exPayment: 'Sending V2EX payment...',
    sendingSolPayment: 'Sending SOL payment...',
    v2exTxSent: 'V2EX transaction sent',
    solTxSent: 'SOL transaction sent',
    v2exPaymentFailed: 'V2EX payment failed',
    solPaymentFailed: 'SOL payment failed',
    connectingWallet: 'Connecting wallet...',
    walletConnectedSuccessfully: 'Wallet connected successfully',
    failedToConnectWallet: 'Failed to connect wallet',
    walletDisconnected: 'Wallet disconnected',
    failedToDisconnect: 'Failed to disconnect',
    checkingBalance: 'Checking balance...',
    failedToGetBalance: 'Failed to get balance',
    failedToCheckBalance: 'Failed to check balance',
    pleaseEnterAddress: 'Please enter an address',
    pleaseEnterTransactionSignature: 'Please enter a transaction signature',
    gettingTransactionDetails: 'Getting transaction details...',
    txStatus: 'Status',
    txType: 'Type',
    txAmount: 'Amount',
    txMemo: 'Memo',
    from: 'From',
    to: 'To',
    timestamp: 'Timestamp',
    transactionNotFound: 'Transaction not found',
    failedToGetTransaction: 'Failed to get transaction',
    signingMessage: 'Signing message...',
    messageCannotBeEmpty: 'Error: message cannot be empty',
    signFailed: 'Sign failed',
    verifyingSignature: 'Verifying signature...',
    allFieldsRequired: 'Error: all fields are required',
    verification: 'Verification',
    valid: 'valid',
    invalid: 'invalid',
    verificationFailed: 'Verification failed',
    verifyFailed: 'Verify failed',
    transactionTip: 'Treat a transaction as successful only after backend inspection.',
    balanceFor: 'Balance for',
    faqTitle: 'FAQ',
    faqIntro: 'These answers cover the token address, template purpose, payments, balance queries, signature verification, and RPC boundaries.',
    fullFaqLink: 'Open full FAQ',
    disclaimer:
      'This project is a developer example, not investment advice. Do not connect a primary wallet or assets you cannot risk to a demo site.',
    footerRepo: 'GitHub repository: becoolme/v2ex-starter-template',
    footerX: 'X: @becool_me',
    footerV2ex: 'V2EX: BeCool',
    changelog: 'Changelog',
  },
} as const satisfies Record<Locale, Record<string, string>>;

export const faqItems = {
  zh: [
    {
      question: 'V2EX 代币在 Solana 上的合约地址是多少？',
      answer: `V2EX 的 Solana SPL Token 合约地址是 ${TOKEN_ADDRESS}，网络是 Solana Mainnet Beta。`,
    },
    {
      question: 'V2EX Starter Template 是什么？',
      answer:
        '它是一个 Next.js 与 Solana 起步模板，提供钱包连接、V2EX 或 SOL 支付、余额查询、交易检查、消息签名与后端验签示例。',
    },
    {
      question: '如何用本模板发送 V2EX 代币？',
      answer:
        '先调用 frontend.connectWallet() 连接钱包，再调用 frontend.sendV2EXPayment(amount, memo, recipientAddress) 发起 V2EX 转账。',
    },
    {
      question: '如何查询任意 Solana 地址的 V2EX 余额？',
      answer:
        '前端演示会请求 /api/balance/[address]，后端 SDK 通过 getV2EXBalance(address) 查询指定地址的 V2EX 余额。',
    },
    {
      question: '如何验证钱包签名并避免重放攻击？',
      answer:
        '让钱包签名包含 timestamp 或 nonce 的消息，再把 message、signature 和 publicKey 发送到 /api/verify-signature 由后端验证。',
    },
    {
      question: '生产环境必须使用私有 RPC 吗？',
      answer:
        '生产环境建议使用 Alchemy、QuickNode、Helius 等私有 RPC。公共 RPC 有速率限制，不适合稳定的生产流量。',
    },
  ],
  en: [
    {
      question: 'What is the V2EX token contract address on Solana?',
      answer: `The V2EX Solana SPL Token contract address is ${TOKEN_ADDRESS} on Solana Mainnet Beta.`,
    },
    {
      question: 'What is V2EX Starter Template?',
      answer:
        'It is a Next.js and Solana starter template with examples for wallet connection, V2EX or SOL payments, balance queries, transaction inspection, message signing, and backend signature verification.',
    },
    {
      question: 'How do I send V2EX tokens with this template?',
      answer:
        'Call frontend.connectWallet() first, then call frontend.sendV2EXPayment(amount, memo, recipientAddress) to request a wallet-signed V2EX transfer.',
    },
    {
      question: 'How do I query the V2EX balance for any Solana address?',
      answer:
        'The demo calls /api/balance/[address]. The backend SDK uses getV2EXBalance(address) to read the V2EX balance for the address.',
    },
    {
      question: 'How do I verify a wallet signature and prevent replay attacks?',
      answer:
        'Ask the wallet to sign a message containing a timestamp or nonce, then send message, signature, and publicKey to /api/verify-signature for backend verification.',
    },
    {
      question: 'Do I need a private RPC endpoint in production?',
      answer:
        'A private RPC from providers such as Alchemy, QuickNode, or Helius is recommended for production. Public RPC endpoints have rate limits and are not reliable for steady production traffic.',
    },
  ],
} as const satisfies Record<Locale, ReadonlyArray<{ question: string; answer: string }>>;

export const tokenFactLinks = {
  repository: REPOSITORY_URL,
  explorer: TOKEN_EXPLORER_URL,
  x: X_URL,
  v2ex: V2EX_PROFILE_URL,
};

export const tokenFactValues = {
  address: TOKEN_ADDRESS,
  decimals: TOKEN_DECIMALS.toString(),
  programId: TOKEN_PROGRAM_ID,
};

export const changelogEntries = {
  zh: [
    {
      date: '2026-07-04',
      title: '页面发现与分享体验改进',
      items: [
        '新增独立英文入口、FAQ、更新记录和品牌化 404 页面。',
        '补充清晰的页面标题、描述、社交分享预览和 V2EX 代币事实卡。',
        '让搜索引擎和 AI 助手更容易理解主要页面、常见问题和项目边界。',
      ],
    },
    {
      date: '2025-08-09',
      title: '项目初始化',
      items: [
        '发布 V2EX Solana 起步模板，包含钱包连接、V2EX 或 SOL 支付、余额查询、交易检查、消息签名与后端验签演示。',
      ],
    },
  ],
  en: [
    {
      date: '2026-07-04',
      title: 'Page discovery and sharing improvements',
      items: [
        'Added a dedicated English entry, FAQ, changelog, and branded 404 page.',
        'Added clearer page titles, descriptions, social sharing preview, and V2EX token facts.',
        'Made the main pages, common questions, and project boundaries easier for search engines and AI assistants to understand.',
      ],
    },
    {
      date: '2025-08-09',
      title: 'Project initialization',
      items: [
        'Released the V2EX Solana starter template with demos for wallet connection, V2EX or SOL payments, balance queries, transaction inspection, message signing, and backend signature verification.',
      ],
    },
  ],
} as const satisfies Record<
  Locale,
  ReadonlyArray<{ date: string; title: string; items: ReadonlyArray<string> }>
>;
