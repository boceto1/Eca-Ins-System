import NodeRSA from 'node-rsa';

const SOURCE_FORMAT = undefined;
const SIGNATURE_FORMAT = 'base64';

type Signature = string;
type KeyNodeRSA = NodeRSA;
type KeyType = 'public' | 'private';

export const generateKeys = (): KeyNodeRSA => new NodeRSA({ b: 2048 });

export const exportKey = (key: KeyNodeRSA, keyType: KeyType): string =>
    key.exportKey(keyType);

export const importKey = (keyData: string, keyType: KeyType): KeyNodeRSA =>
    new NodeRSA(keyData, keyType);

export const signDocument = (data: string, privateKey: string): Signature => {
    const key = importKey(privateKey, 'private');
    return key.sign(data, SIGNATURE_FORMAT);
};

export const verifyDocumentSignature = (data: string, signature: Signature, publickey: string): boolean | string => {
    try {
        const key = importKey(publickey, 'public');
        return key.verify(data, signature, SOURCE_FORMAT, SIGNATURE_FORMAT);
    } catch (error) {
        return `Error to verify Document: ${error}`;
    }
};