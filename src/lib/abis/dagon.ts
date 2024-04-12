export const dagonAbi = [
    { inputs: [], stateMutability: 'payable', type: 'constructor' },
    { inputs: [], name: 'BalanceOverflow', type: 'error' },
    { inputs: [], name: 'InsufficientBalance', type: 'error' },
    { inputs: [], name: 'InsufficientPermission', type: 'error' },
    { inputs: [], name: 'InvalidSetting', type: 'error' },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'spender',
          type: 'address',
        },
        { indexed: true, internalType: 'uint256', name: 'id', type: 'uint256' },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'Approval',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'contract IAuth',
          name: 'auth',
          type: 'address',
        },
      ],
      name: 'AuthSet',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        { indexed: false, internalType: 'bool', name: 'approved', type: 'bool' },
      ],
      name: 'OperatorSet',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint88',
          name: 'threshold',
          type: 'uint88',
        },
      ],
      name: 'ThresholdSet',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'token',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'enum Dagon.Standard',
          name: 'standard',
          type: 'uint8',
        },
      ],
      name: 'TokenSet',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        { indexed: false, internalType: 'address', name: 'by', type: 'address' },
        { indexed: true, internalType: 'address', name: 'from', type: 'address' },
        { indexed: true, internalType: 'address', name: 'to', type: 'address' },
        { indexed: true, internalType: 'uint256', name: 'id', type: 'uint256' },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'Transfer',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        { indexed: false, internalType: 'string', name: 'uri', type: 'string' },
      ],
      name: 'URISet',
      type: 'event',
    },
    {
      inputs: [
        { internalType: 'address', name: 'owner', type: 'address' },
        { internalType: 'address', name: 'spender', type: 'address' },
        { internalType: 'uint256', name: 'id', type: 'uint256' },
      ],
      name: 'allowance',
      outputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'spender', type: 'address' },
        { internalType: 'uint256', name: 'id', type: 'uint256' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' },
      ],
      name: 'approve',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'owner', type: 'address' },
        { internalType: 'uint256', name: 'id', type: 'uint256' },
      ],
      name: 'balanceOf',
      outputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'owner', type: 'address' },
        { internalType: 'uint96', name: 'shares', type: 'uint96' },
      ],
      name: 'burn',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'id', type: 'uint256' }],
      name: 'decimals',
      outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
      name: 'getMetadata',
      outputs: [
        { internalType: 'string', name: '', type: 'string' },
        { internalType: 'string', name: '', type: 'string' },
        { internalType: 'string', name: '', type: 'string' },
        { internalType: 'contract IAuth', name: '', type: 'address' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
      name: 'getSettings',
      outputs: [
        { internalType: 'address', name: '', type: 'address' },
        { internalType: 'uint88', name: '', type: 'uint88' },
        { internalType: 'enum Dagon.Standard', name: '', type: 'uint8' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          components: [
            { internalType: 'address', name: 'owner', type: 'address' },
            { internalType: 'uint96', name: 'shares', type: 'uint96' },
          ],
          internalType: 'struct Dagon.Ownership[]',
          name: 'owners',
          type: 'tuple[]',
        },
        {
          components: [
            { internalType: 'address', name: 'token', type: 'address' },
            { internalType: 'uint88', name: 'threshold', type: 'uint88' },
            {
              internalType: 'enum Dagon.Standard',
              name: 'standard',
              type: 'uint8',
            },
          ],
          internalType: 'struct Dagon.Settings',
          name: 'setting',
          type: 'tuple',
        },
        {
          components: [
            { internalType: 'string', name: 'name', type: 'string' },
            { internalType: 'string', name: 'symbol', type: 'string' },
            { internalType: 'string', name: 'tokenURI', type: 'string' },
            {
              internalType: 'contract IAuth',
              name: 'authority',
              type: 'address',
            },
            { internalType: 'uint96', name: 'totalSupply', type: 'uint96' },
          ],
          internalType: 'struct Dagon.Metadata',
          name: 'meta',
          type: 'tuple',
        },
      ],
      name: 'install',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'owner', type: 'address' },
        { internalType: 'address', name: 'spender', type: 'address' },
      ],
      name: 'isOperator',
      outputs: [{ internalType: 'bool', name: 'status', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'bytes32', name: 'hash', type: 'bytes32' },
        { internalType: 'bytes', name: 'signature', type: 'bytes' },
      ],
      name: 'isValidSignature',
      outputs: [{ internalType: 'bytes4', name: '', type: 'bytes4' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'owner', type: 'address' },
        { internalType: 'uint96', name: 'shares', type: 'uint96' },
      ],
      name: 'mint',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'id', type: 'uint256' }],
      name: 'name',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'contract IAuth', name: 'auth', type: 'address' }],
      name: 'setAuth',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'operator', type: 'address' },
        { internalType: 'bool', name: 'approved', type: 'bool' },
      ],
      name: 'setOperator',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint88', name: 'threshold', type: 'uint88' }],
      name: 'setThreshold',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'token', type: 'address' },
        { internalType: 'enum Dagon.Standard', name: 'standard', type: 'uint8' },
      ],
      name: 'setToken',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'string', name: 'uri', type: 'string' }],
      name: 'setURI',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
      name: 'supportsInterface',
      outputs: [{ internalType: 'bool', name: 'result', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'id', type: 'uint256' }],
      name: 'symbol',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'id', type: 'uint256' }],
      name: 'tokenURI',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'id', type: 'uint256' }],
      name: 'totalSupply',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'id', type: 'uint256' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' },
      ],
      name: 'transfer',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'from', type: 'address' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'id', type: 'uint256' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' },
      ],
      name: 'transferFrom',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        {
          components: [
            { internalType: 'address', name: 'sender', type: 'address' },
            { internalType: 'uint256', name: 'nonce', type: 'uint256' },
            { internalType: 'bytes', name: 'initCode', type: 'bytes' },
            { internalType: 'bytes', name: 'callData', type: 'bytes' },
            {
              internalType: 'bytes32',
              name: 'accountGasLimits',
              type: 'bytes32',
            },
            {
              internalType: 'uint256',
              name: 'preVerificationGas',
              type: 'uint256',
            },
            { internalType: 'bytes32', name: 'gasFees', type: 'bytes32' },
            { internalType: 'bytes', name: 'paymasterAndData', type: 'bytes' },
            { internalType: 'bytes', name: 'signature', type: 'bytes' },
          ],
          internalType: 'struct Dagon.PackedUserOperation',
          name: 'userOp',
          type: 'tuple',
        },
        { internalType: 'bytes32', name: 'userOpHash', type: 'bytes32' },
        { internalType: 'uint256', name: '', type: 'uint256' },
      ],
      name: 'validateUserOp',
      outputs: [
        { internalType: 'uint256', name: 'validationData', type: 'uint256' },
      ],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'account', type: 'address' },
        { internalType: 'bytes32', name: 'userOpHash', type: 'bytes32' },
        { internalType: 'bytes', name: 'signature', type: 'bytes' },
      ],
      name: 'vote',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'owner', type: 'address' },
        { internalType: 'bytes32', name: 'signedHash', type: 'bytes32' },
      ],
      name: 'voted',
      outputs: [{ internalType: 'uint256', name: 'shares', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'bytes32', name: 'signedHash', type: 'bytes32' }],
      name: 'votingTally',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
  ] as const
  