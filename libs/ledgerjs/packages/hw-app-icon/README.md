## @ledgerhq/hw-app-icon

Ledger Hardware Wallet Icon JavaScript bindings.

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

*   [Icx](#icx)
    *   [Parameters](#parameters)
    *   [Examples](#examples)
    *   [getAddress](#getaddress)
        *   [Parameters](#parameters-1)
        *   [Examples](#examples-1)
    *   [signTransaction](#signtransaction)
        *   [Parameters](#parameters-2)
        *   [Examples](#examples-2)
    *   [getAppConfiguration](#getappconfiguration)

### Icx

ICON API

#### Parameters

*   `transport` **Transport**&#x20;

#### Examples

```javascript
import Icx from "@ledgerhq/hw-app-icx";
const icx = new Icx(transport)
```

#### getAddress

Returns public key and ICON address for a given BIP 32 path.

##### Parameters

*   `path` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** a path in BIP 32 format
*   `boolDisplay`   (optional, default `false`)
*   `boolChaincode`   (optional, default `true`)

##### Examples

```javascript
icx.getAddress("44'/4801368'/0'", true, true).then(o => o.address)
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<{publicKey: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), address: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), chainCode: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?}>** an object with a publickey(hexa string), address(string) and
(optionally) chaincode(hexa string)

#### signTransaction

Signs a transaction and returns signed message given the raw transaction
and the BIP 32 path of the account to sign

##### Parameters

*   `path` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** a path in BIP 32 format
*   `rawTxAscii` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** raw transaction data to sign in ASCII string format

##### Examples

```javascript
icx.signTransaction("44'/4801368'/0'",
    "icx_sendTransaction.fee.0x2386f26fc10000." +
    "from.hxc9ecad30b05a0650a337452fce031e0c60eacc3a.nonce.0x3." +
    "to.hx4c5101add2caa6a920420cf951f7dd7c7df6ca24.value.0xde0b6b3a7640000")
  .then(result => ...)
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<{signedRawTxBase64: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), hashHex: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)}>** an object with a base64 encoded signature and hash in hexa string

#### getAppConfiguration

Returns the application configurations such as versions.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<{majorVersion: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), minorVersion: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), patchVersion: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)}>** major/minor/patch versions of Icon application
