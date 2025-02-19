# Identity Kit 👨‍🚀

## Name

The Name component is used to display ENS names associated with Ethereum addresses. When an ENS name is not available, it defaults to showing a truncated version of the address.

```ts
import { Name } from '@coinbase/onchainkit';


<Name address="0x1234567890abcdef1234567890abcdef12345678" sliced={false} />;
```

## @Props

```ts
type UseName = {
  // Ethereum address to be resolved from ENS.
  address: Address;
  // Optional CSS class for custom styling.
  className?: string;
  // Determines if the address should be sliced when no ENS name is available.
  sliced?: boolean;
  // Additional HTML attributes for the span element.
  props?: React.HTMLAttributes<HTMLSpanElement>;
};
```
