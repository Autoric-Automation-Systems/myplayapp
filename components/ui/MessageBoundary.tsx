import { Suspense } from 'react';
import Message from './Message';

export default function MessageBoundary() {
  return (
    <Suspense fallback={null}>
      <Message />
    </Suspense>
  );
}
