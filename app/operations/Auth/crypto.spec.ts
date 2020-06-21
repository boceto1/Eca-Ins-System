import NodeRSA from 'node-rsa';
import {
    signDocument,
    verifyDocumentSignature,
    generateKeys,
    exportKey,
    importKey
}
    from './crypto';

describe('Crypto Operations', () => {

    it('* importKey Public Key', () => {
        const key = generateKeys();
        const publicKey = exportKey(key, 'public');

        const generatedKey = importKey(publicKey, 'public');

        expect(generatedKey.isPublic()).toEqual(true);
    });

    describe('*verifyDocumentSignature', () => {
        let data: string, key: NodeRSA, publicKey: string, signature: string;
        beforeEach(() => {
            data = 'foo-data';
            key = generateKeys();
            publicKey = exportKey(key, 'public');
            const privateKey = exportKey(key, 'private');
            signature = signDocument(data, privateKey);
        });
        describe('when the signature is wrong', () => {
            it('should return false', () => {
                signature = 'fake-signature';
                expect(verifyDocumentSignature(data, signature, publicKey)).toBe(false);
            });
        });
        describe('when the data is wrong', () => {
            it('should return false', () => {
                data = 'fake-data';
                expect(verifyDocumentSignature(data, signature, publicKey)).toBe(false);
            });
        });
        describe('when the public key is wrong', () => {
            it('should return false', () => {
                const fakeKey = generateKeys();
                const fakePublicKey = exportKey(fakeKey, 'public');
                expect(verifyDocumentSignature(data, signature, fakePublicKey)).toBe(false);
            });
        });
        describe('when the public key has a wrong format', () => {
            it('should return an error', () => {
                const fakePublicKey = 'fake-public-key';
                const errorResponse = verifyDocumentSignature(data, signature, fakePublicKey) + '';
                expect(errorResponse.includes(
                    'Error to verify Document:'
                )).toBe(true);
            });
        });
        describe('when all the data is correct', () => {
            it('should return false', () => {
                expect(verifyDocumentSignature(data, signature, publicKey)).toBe(true);
            });
        });
    });
});