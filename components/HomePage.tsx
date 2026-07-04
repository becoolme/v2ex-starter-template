import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import config from '../lib/config';
import {
  LOCALES,
  ROUTE_ALTERNATES,
  TOKEN_EXPLORER_URL,
  faqPageJsonLd,
  organizationJsonLd,
  softwareApplicationJsonLd,
  type Locale,
} from '../lib/seo';
import { faqItems, homeCopy, seoCopy, tokenFactLinks, tokenFactValues } from '../lib/site-content';
import { V2EXFrontend } from '../src/fe/index';
import PageSeo from './PageSeo';
import SiteFooter from './SiteFooter';

interface HomePageProps {
  initialLocale: Locale;
  canonicalPath: string;
}

interface WalletInfo {
  address: string | null;
  balance: string | null;
  connected: boolean;
}

interface PanelProps {
  id: string;
  title: string;
  purpose?: string;
  children: React.ReactNode;
}

const buttonClass =
  'bg-black text-white border-2 border-black px-4 py-2.5 mr-2.5 mb-2.5 font-mono text-sm font-bold cursor-pointer transition-colors duration-100 disabled:cursor-not-allowed disabled:opacity-60 hover:bg-white hover:text-black disabled:hover:bg-black disabled:hover:text-white';

const inputClass =
  'w-full bg-white text-black font-mono border-2 border-[#333] px-3 py-2 mb-2.5 text-sm focus:border-black focus:bg-[#f9f9f9] focus:outline-none';

const resultClass =
  'mt-3 max-h-[200px] overflow-y-auto whitespace-pre-wrap break-all border-2 border-black bg-white p-3 text-[13px] text-black';

function Panel({ id, title, purpose, children }: PanelProps) {
  return (
    <section id={id} className="mb-6 border border-black bg-[#fafafa]">
      <h2 className="border-b border-black bg-black px-4 py-2.5 text-sm font-bold text-white">{title}</h2>
      <div className="p-4">
        {purpose && <p className="mb-3 text-sm leading-6 text-gray-800">{purpose}</p>}
        {children}
      </div>
    </section>
  );
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="my-3 overflow-x-auto whitespace-pre-wrap border border-[#ccc] bg-[#f8f8f8] p-3 font-mono text-xs text-[#222]">
      {children}
    </pre>
  );
}

export default function HomePage({ initialLocale, canonicalPath }: HomePageProps) {
  const [language] = useState<Locale>(initialLocale);
  const [walletInfo, setWalletInfo] = useState<WalletInfo>({
    address: null,
    balance: null,
    connected: false,
  });
  const [sdk, setSdk] = useState<V2EXFrontend | null>(null);
  const [results, setResults] = useState<Record<string, string>>({});

  const text = homeCopy[language];

  useEffect(() => {
    document.documentElement.lang = LOCALES[language].htmlLang;
    setSdk(new V2EXFrontend(config.client.rpcUrl, config.client.tokenAddress));
  }, [language]);

  const showResult = (elementId: string, message: string, type: 'error' | 'success' | 'loading' | '' = '') => {
    const prefix = type === 'error' ? 'Error: ' : type === 'success' ? 'OK: ' : '';
    setResults((prev) => ({
      ...prev,
      [elementId]: `${prefix}${message}`,
    }));
  };

  const connectWallet = async () => {
    if (!sdk) return;
    try {
      showResult('walletResult', text.connectingWallet, 'loading');
      const address = await sdk.connectWallet();
      setWalletInfo({
        address,
        balance: 'loading...',
        connected: true,
      });
      await checkBalance();
      showResult('walletResult', text.walletConnectedSuccessfully, 'success');
    } catch (error: any) {
      showResult('walletResult', `${text.failedToConnectWallet}: ${error.message}`, 'error');
    }
  };

  const disconnectWallet = async () => {
    if (!sdk) return;
    try {
      await sdk.disconnectWallet();
      setWalletInfo({
        address: null,
        balance: null,
        connected: false,
      });
      showResult('walletResult', text.walletDisconnected, 'success');
    } catch (error: any) {
      showResult('walletResult', `${text.failedToDisconnect}: ${error.message}`, 'error');
    }
  };

  const checkBalance = async () => {
    if (!sdk) return;
    try {
      const address = sdk.getWalletAddress();
      if (!address) {
        showResult('walletResult', text.walletNotConnected, 'error');
        return;
      }

      showResult('walletResult', text.checkingBalance, 'loading');
      const response = await fetch(`/api/balance/${address}`);
      const data = await response.json();

      if (response.ok) {
        setWalletInfo((prev) => ({ ...prev, balance: `${data.balance} V2EX` }));
        showResult('walletResult', `${text.balance}: ${data.balance} V2EX`, 'success');
      } else {
        showResult('walletResult', data.error || text.failedToGetBalance, 'error');
      }
    } catch (error: any) {
      showResult('walletResult', `${text.failedToCheckBalance}: ${error.message}`, 'error');
    }
  };

  const sendV2EXPayment = async () => {
    if (!sdk) return;
    try {
      const recipientInput = document.getElementById('recipientAddress') as HTMLInputElement;
      const amountInput = document.getElementById('amount') as HTMLInputElement;
      const memoInput = document.getElementById('memo') as HTMLInputElement;

      const recipient = recipientInput?.value;
      const amount = Number(amountInput?.value);
      const memo = memoInput?.value || '';

      if (!recipient || !amountInput?.value) {
        showResult('paymentResult', text.missingRequiredFields, 'error');
        return;
      }

      if (!Number.isFinite(amount) || amount <= 0) {
        showResult('paymentResult', text.invalidAmount, 'error');
        return;
      }

      showResult('paymentResult', text.sendingV2exPayment, 'loading');
      const signature = await sdk.sendV2EXPayment(amount, memo, recipient);
      showResult('paymentResult', `${text.v2exTxSent}: ${signature}`, 'success');

      if (recipientInput) recipientInput.value = '';
      if (amountInput) amountInput.value = '';
      if (memoInput) memoInput.value = '';

      setTimeout(checkBalance, 2000);
    } catch (error: any) {
      showResult('paymentResult', `${text.v2exPaymentFailed}: ${error.message}`, 'error');
    }
  };

  const sendSolPayment = async () => {
    if (!sdk) return;
    try {
      const recipientInput = document.getElementById('recipientAddress') as HTMLInputElement;
      const amountInput = document.getElementById('amount') as HTMLInputElement;
      const memoInput = document.getElementById('memo') as HTMLInputElement;

      const recipient = recipientInput?.value;
      const amount = Number(amountInput?.value);
      const memo = memoInput?.value || '';

      if (!recipient || !amountInput?.value) {
        showResult('paymentResult', text.missingRequiredFields, 'error');
        return;
      }

      if (!Number.isFinite(amount) || amount <= 0) {
        showResult('paymentResult', text.invalidAmount, 'error');
        return;
      }

      showResult('paymentResult', text.sendingSolPayment, 'loading');
      const signature = await sdk.sendSol(amount, memo, recipient);
      showResult('paymentResult', `${text.solTxSent}: ${signature}`, 'success');

      if (recipientInput) recipientInput.value = '';
      if (amountInput) amountInput.value = '';
      if (memoInput) memoInput.value = '';

      setTimeout(checkBalance, 2000);
    } catch (error: any) {
      showResult('paymentResult', `${text.solPaymentFailed}: ${error.message}`, 'error');
    }
  };

  const checkAddressBalance = async () => {
    try {
      const addressInput = document.getElementById('checkAddress') as HTMLInputElement;
      const address = addressInput?.value;

      if (!address) {
        showResult('balanceResult', text.pleaseEnterAddress, 'error');
        return;
      }

      showResult('balanceResult', text.checkingBalance, 'loading');
      const response = await fetch(`/api/balance/${address}`);
      const data = await response.json();

      if (response.ok) {
        showResult(
          'balanceResult',
          `${text.balanceFor} ${address.substring(0, 8)}...: ${data.balance} V2EX`,
          'success',
        );
      } else {
        showResult('balanceResult', data.error || text.failedToGetBalance, 'error');
      }
    } catch (error: any) {
      showResult('balanceResult', `${text.failedToCheckBalance}: ${error.message}`, 'error');
    }
  };

  const getTransactionDetails = async () => {
    try {
      const signatureInput = document.getElementById('txSignature') as HTMLInputElement;
      const signature = signatureInput?.value;

      if (!signature) {
        showResult('transactionResult', text.pleaseEnterTransactionSignature, 'error');
        return;
      }

      showResult('transactionResult', text.gettingTransactionDetails, 'loading');
      const response = await fetch(`/api/transaction/${signature}`);
      const data = await response.json();

      if (response.ok && data.transaction) {
        const tx = data.transaction;
        showResult(
          'transactionResult',
          `${text.txStatus}: ${tx.status}
${text.txType}: ${tx.type}
${text.txAmount}: ${tx.amount} ${tx.type === 'V2EX' ? 'V2EX' : 'SOL'}
${text.txMemo}: ${tx.memo || 'N/A'}
${text.from}: ${tx.from}
${text.to}: ${tx.to}
${text.timestamp}: ${new Date(tx.timestamp * 1000).toLocaleString(language === 'zh' ? 'zh-CN' : 'en-US')}`,
          'success',
        );
      } else {
        showResult('transactionResult', data.error || text.transactionNotFound, 'error');
      }
    } catch (error: any) {
      showResult('transactionResult', `${text.failedToGetTransaction}: ${error.message}`, 'error');
    }
  };

  const signMessage = async () => {
    if (!sdk) return;
    try {
      const messageInput = document.getElementById('messageInput') as HTMLInputElement;
      const message = messageInput?.value;

      if (!message) {
        showResult('signResult', text.messageCannotBeEmpty, 'error');
        return;
      }

      showResult('signResult', text.signingMessage, 'loading');
      const result = await sdk.signMessage(message);

      let signatureHex = '';
      if (result.signature && Array.isArray(result.signature)) {
        signatureHex = result.signature.map((b: number) => b.toString(16).padStart(2, '0')).join('');
      }

      showResult(
        'signResult',
        `${text.signature}: ${signatureHex}
${text.publicKey}: ${result.publicKey}
${text.message}: ${result.message}`,
        'success',
      );

      const verifySignatureInput = document.getElementById('verifySignature') as HTMLInputElement;
      const verifyMessageInput = document.getElementById('verifyMessage') as HTMLInputElement;
      const verifyPubkeyInput = document.getElementById('verifyPubkey') as HTMLInputElement;

      if (verifySignatureInput && signatureHex) verifySignatureInput.value = signatureHex;
      if (verifyMessageInput && result.message) verifyMessageInput.value = result.message;
      if (verifyPubkeyInput && result.publicKey) verifyPubkeyInput.value = result.publicKey;

      if (messageInput) messageInput.value = '';
    } catch (error: any) {
      const errorMessage = error?.message || error?.toString() || 'Unknown error';
      showResult('signResult', `${text.signFailed}: ${errorMessage}`, 'error');
    }
  };

  const verifySignature = async () => {
    try {
      const signatureInput = document.getElementById('verifySignature') as HTMLInputElement;
      const messageInput = document.getElementById('verifyMessage') as HTMLInputElement;
      const publicKeyInput = document.getElementById('verifyPubkey') as HTMLInputElement;

      const signature = signatureInput?.value;
      const message = messageInput?.value;
      const publicKey = publicKeyInput?.value;

      if (!signature || !message || !publicKey) {
        showResult('verifyResult', text.allFieldsRequired, 'error');
        return;
      }

      showResult('verifyResult', text.verifyingSignature, 'loading');

      const response = await fetch('/api/verify-signature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          signature,
          message,
          publicKey,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const status = data.isValid ? text.valid : text.invalid;
        const resultType = data.isValid ? 'success' : 'error';
        showResult('verifyResult', `${text.verification}: ${status}`, resultType);
      } else {
        showResult('verifyResult', data.error || text.verificationFailed, 'error');
      }
    } catch (error: any) {
      showResult('verifyResult', `${text.verifyFailed}: ${error.message}`, 'error');
    }
  };

  return (
    <>
      <PageSeo
        title={seoCopy[language].homeTitle}
        description={seoCopy[language].homeDescription}
        canonicalPath={canonicalPath}
        locale={language}
        alternates={ROUTE_ALTERNATES.home}
        structuredData={[
          organizationJsonLd(),
          softwareApplicationJsonLd(language),
          faqPageJsonLd(faqItems[language], language),
        ]}
      />

      {process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN && process.env.NEXT_PUBLIC_ANALYTICS_SRC && (
        <Script
          defer
          data-domain={process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN}
          src={process.env.NEXT_PUBLIC_ANALYTICS_SRC}
        />
      )}

      <main className="mt-10 w-full max-w-4xl bg-white">
        <header className="mb-5 border-b border-black pb-3">
          <div className="mb-3 flex flex-col items-start justify-between gap-4 sm:flex-row">
            <div className="flex-1">
              <h1 className="mb-2 text-xl font-bold text-black sm:text-2xl">{text.title}</h1>
              <p className="text-sm text-gray-700">{text.subtitle}</p>
            </div>
            <Link
              href={text.languageHref}
              hrefLang={language === 'zh' ? 'en' : 'zh-Hans'}
              className="border border-black bg-white px-2 py-1 font-mono text-xs font-bold text-black transition-colors hover:bg-black hover:text-white"
            >
              {text.languageLink}
            </Link>
          </div>
          <p className="mb-3 max-w-3xl text-sm leading-6 text-gray-900">{text.summary}</p>
          <p className="mb-1 text-xs font-bold uppercase tracking-normal text-gray-700">{text.installLabel}</p>
          <CodeBlock>{text.installCmd}</CodeBlock>
        </header>

        <section id="v2ex-token" className="mb-6 border border-black bg-[#fafafa]">
          <h2 className="border-b border-black bg-black px-4 py-2.5 text-sm font-bold text-white">
            {text.tokenFacts}
          </h2>
          <div className="p-4">
            <p className="mb-3 text-sm leading-6 text-gray-800">{text.tokenFactsIntro}</p>
            <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-[160px_1fr]">
              <dt className="font-bold">{text.tokenName}</dt>
              <dd>{text.tokenNameValue}</dd>
              <dt className="font-bold">{text.tokenAddress}</dt>
              <dd className="break-all">
                <a
                  href={TOKEN_EXPLORER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black underline decoration-black underline-offset-2 hover:text-gray-600"
                >
                  {tokenFactValues.address}
                </a>
              </dd>
              <dt className="font-bold">{text.tokenDecimals}</dt>
              <dd>{tokenFactValues.decimals}</dd>
              <dt className="font-bold">{text.tokenNetwork}</dt>
              <dd>{text.tokenNetworkValue}</dd>
              <dt className="font-bold">{text.tokenProgram}</dt>
              <dd className="break-all">{tokenFactValues.programId}</dd>
              <dt className="font-bold">{text.officialRepo}</dt>
              <dd className="break-all">
                <a
                  href={tokenFactLinks.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black underline decoration-black underline-offset-2 hover:text-gray-600"
                >
                  becoolme/v2ex-starter-template
                </a>
              </dd>
            </dl>
          </div>
        </section>

        <Panel id="configuration" title={text.configuration} purpose={text.configIntro}>
          <div className="my-2">
            <div className="mb-1.5 text-sm text-black">
              <strong className="inline-block w-20 font-bold sm:w-24">RPC URL:</strong>{' '}
              https://api.mainnet-beta.solana.com
            </div>
            <div className="mb-1.5 text-sm text-black">
              <strong className="inline-block w-20 font-bold sm:w-24">V2EX Token:</strong>{' '}
              <span className="break-all">{config.client.tokenAddress}</span>
            </div>
            <div className="my-2.5 border border-orange-600 bg-orange-50 p-2 text-sm font-bold text-orange-700">
              {text.rpcNote}
            </div>
            <div className="mb-3 text-xs italic text-gray-600">{text.rpcProviders}</div>
            <div className="my-3 text-xs text-gray-700">{text.configNote}</div>
          </div>
        </Panel>

        <Panel id="wallet" title={text.wallet} purpose={text.walletPurpose}>
          <div className="mb-3 border border-black bg-white px-2 py-1.5 text-xs text-green-700">
            {text.walletStatus}:{' '}
            {walletInfo.connected
              ? `${text.connected} ${walletInfo.address?.substring(0, 8)}...${walletInfo.address?.slice(-4)}`
              : text.disconnected}
            {walletInfo.balance && (
              <>
                <br />
                {text.balance}: {walletInfo.balance}
              </>
            )}
          </div>
          <CodeBlock>{`import { V2EXFrontend } from './src/fe';

const frontend = new V2EXFrontend(rpcUrl, tokenAddress);
const address = await frontend.connectWallet();
const balance = await frontend.getV2EXBalance();`}</CodeBlock>
          {!walletInfo.connected ? (
            <button className={buttonClass} onClick={connectWallet} type="button">
              {text.connect}
            </button>
          ) : (
            <button className={buttonClass} onClick={disconnectWallet} type="button">
              {text.disconnect}
            </button>
          )}
          <button className={buttonClass} onClick={checkBalance} disabled={!walletInfo.connected} type="button">
            {text.balance}
          </button>
          {results.walletResult && <div className={resultClass}>{results.walletResult}</div>}
        </Panel>

        <Panel id="send" title={text.send} purpose={text.sendPurpose}>
          <CodeBlock>{`// Send V2EX tokens
const signature = await frontend.sendV2EXPayment(
  amount, memo, recipientAddress
);

// Send SOL
const signature = await frontend.sendSol(
  amount, memo, recipientAddress
);`}</CodeBlock>
          <input className={inputClass} type="text" id="recipientAddress" placeholder={text.recipientAddress} />
          <div className="mb-2.5 flex flex-col gap-3 sm:flex-row">
            <input className={`${inputClass} mb-0 flex-1`} type="number" id="amount" placeholder={text.amount} step="0.01" />
            <input className={`${inputClass} mb-0 flex-1`} type="text" id="memo" placeholder={text.memo} />
          </div>
          <div className="mb-3 mt-1 text-xs italic text-gray-600">{text.memoHint}</div>
          <button className={buttonClass} onClick={sendV2EXPayment} disabled={!walletInfo.connected} type="button">
            {text.sendV2ex}
          </button>
          <button className={buttonClass} onClick={sendSolPayment} disabled={!walletInfo.connected} type="button">
            {text.sendSol}
          </button>
          {results.paymentResult && <div className={resultClass}>{results.paymentResult}</div>}
        </Panel>

        <Panel id="query-balance" title={text.queryBalance} purpose={text.queryPurpose}>
          <CodeBlock>{`import { V2EXBackend } from './src/be';

const backend = new V2EXBackend(rpcUrl, tokenAddress);
const balance = await backend.getV2EXBalance(address);`}</CodeBlock>
          <input className={inputClass} type="text" id="checkAddress" placeholder={text.solanaAddress} />
          <button className={buttonClass} onClick={checkAddressBalance} type="button">
            {text.query}
          </button>
          {results.balanceResult && <div className={resultClass}>{results.balanceResult}</div>}
        </Panel>

        <Panel id="inspect-transaction" title={text.inspectTransaction} purpose={text.inspectPurpose}>
          <div className="mb-3 border border-blue-500 bg-blue-50 p-3 text-[13px] leading-5 text-blue-900">
            {text.transactionTip}
          </div>
          <CodeBlock>{`const details = await backend.getTransactionDetails(signature);`}</CodeBlock>
          <input className={inputClass} type="text" id="txSignature" placeholder={text.transactionSignature} />
          <button
            type="button"
            className="mb-2 block break-all text-left font-mono text-[11px] text-gray-500 transition-colors hover:text-gray-700"
            onClick={() => {
              const input = document.getElementById('txSignature') as HTMLInputElement;
              if (input) input.value = '5rBiFnhk2xypj1wnMAQtAskuysMR1MtrTVVHSPsCxXNEdVNkCdwFPVHua7itteGChKGu5gYMzmZxEQ1ZDQjXxEHX';
            }}
          >
            $V2EX tx: 5rBiFnhk2xypj1wnMAQtAskuysMR1MtrTVVHSPsCxXNEdVNkCdwFPVHua7itteGChKGu5gYMzmZxEQ1ZDQjXxEHX
          </button>
          <button
            type="button"
            className="mb-2 block break-all text-left font-mono text-[11px] text-gray-500 transition-colors hover:text-gray-700"
            onClick={() => {
              const input = document.getElementById('txSignature') as HTMLInputElement;
              if (input) input.value = '43AZaVYa6B1Z9Wct8nutBvNBEv7KbMzPFqpjWNdJKiSeRpR6eBVQKupe6sSyXoki5RfWgTnHQFDr8YP6vYGwycsE';
            }}
          >
            SOL tx: 43AZaVYa6B1Z9Wct8nutBvNBEv7KbMzPFqpjWNdJKiSeRpR6eBVQKupe6sSyXoki5RfWgTnHQFDr8YP6vYGwycsE
          </button>
          <button className={buttonClass} onClick={getTransactionDetails} type="button">
            {text.inspect}
          </button>
          {results.transactionResult && <div className={resultClass}>{results.transactionResult}</div>}
        </Panel>

        <Panel id="sign-verify" title={text.sign} purpose={text.signPurpose}>
          <div className="my-2 border border-blue-500 bg-blue-50 p-3 text-[13px] leading-5 text-blue-900">
            {text.signatureExplanation}
          </div>
          <CodeBlock>{`const signature = await frontend.signMessage(message);
const isValid = await backend.verifySignature(message, signature, publicKey);`}</CodeBlock>
          <input className={inputClass} type="text" id="messageInput" placeholder={text.messageToSign} />
          <button className={buttonClass} onClick={signMessage} disabled={!walletInfo.connected} type="button">
            {text.sign}
          </button>
          {results.signResult && <div className={resultClass}>{results.signResult}</div>}

          <h3 className="mb-4 mt-6 border-t-2 border-black pt-4 text-sm font-bold text-[#333]">{text.verifySignature}</h3>
          <input className={inputClass} type="text" id="verifySignature" placeholder={text.signature} />
          <input className={inputClass} type="text" id="verifyMessage" placeholder={text.message} />
          <input className={inputClass} type="text" id="verifyPubkey" placeholder={text.publicKey} />
          <button className={buttonClass} onClick={verifySignature} type="button">
            {text.verify}
          </button>
          {results.verifyResult && <div className={resultClass}>{results.verifyResult}</div>}
        </Panel>

        <section id="faq" className="mb-6 border border-black bg-[#fafafa]">
          <h2 className="border-b border-black bg-black px-4 py-2.5 text-sm font-bold text-white">
            {text.faqTitle}
          </h2>
          <div className="p-4">
            <p className="mb-4 text-sm leading-6 text-gray-800">{text.faqIntro}</p>
            <div className="grid gap-4">
              {faqItems[language].map((item) => (
                <article key={item.question} className="border-b border-gray-300 pb-4 last:border-b-0 last:pb-0">
                  <h3 className="mb-2 text-sm font-bold text-black">{item.question}</h3>
                  <p className="text-sm leading-6 text-gray-800">{item.answer}</p>
                </article>
              ))}
            </div>
            <Link
              href={language === 'zh' ? '/faq' : '/en/faq'}
              className="mt-4 inline-block font-bold text-black underline decoration-black underline-offset-2 hover:text-gray-600"
            >
              {text.fullFaqLink}
            </Link>
          </div>
        </section>

        <SiteFooter locale={language} />
      </main>
    </>
  );
}
