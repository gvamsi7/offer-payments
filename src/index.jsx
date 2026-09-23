import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'

const config = {
  id: 'payments',
  name: 'Payments',
  shortName: 'Payments',
  description: 'Payment operations, settlements and transaction monitoring.',
}

const css = `
.payments-offer{font-family:Inter,system-ui,sans-serif;color:#edf4ff}
.payments-offer .hero{display:flex;justify-content:space-between;gap:18px;align-items:flex-start;padding:22px;border:1px solid #263a5c;border-radius:18px;background:linear-gradient(135deg,#10264b,#0b1930)}
.payments-offer h2{margin:0 0 8px;font-size:28px}.payments-offer p{margin:0;color:#9cb0cf;line-height:1.5}
.payments-offer .notify{border:0;border-radius:10px;padding:10px 13px;background:#68e1bd;color:#052016;font-weight:800;cursor:pointer}
.payments-offer .stats{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:16px 0}.payments-offer .stat{padding:17px;border:1px solid #243858;border-radius:15px;background:#0d1b32}
.payments-offer .stat span{display:block;color:#8196b7;font-size:12px}.payments-offer .stat strong{display:block;font-size:24px;margin-top:8px}
.payments-offer .panel{border:1px solid #243858;border-radius:16px;background:#0b172b;overflow:hidden}.payments-offer .panel h3{margin:0;padding:16px 18px;border-bottom:1px solid #223653}
.payments-offer table{width:100%;border-collapse:collapse}.payments-offer th,.payments-offer td{text-align:left;padding:13px 18px;border-bottom:1px solid #1d2e48;font-size:13px}.payments-offer th{color:#758bad;font-size:11px;text-transform:uppercase}
.payments-offer .ok{color:#68e1bd}.payments-offer .pending{color:#f5c66b}
@media(max-width:760px){.payments-offer .stats{grid-template-columns:1fr}.payments-offer .hero{flex-direction:column}.payments-offer table{font-size:12px}}
`

function ensureStyle() {
  if (document.getElementById('payments-offer-style')) return
  const style = document.createElement('style')
  style.id = 'payments-offer-style'
  style.textContent = css
  document.head.appendChild(style)
}

function PaymentsApp({ host }) {
  const [count, setCount] = useState(1284)

  const notify = () => {
    setCount((value) => value + 1)
    host?.notify?.('Payment captured', '₹4,850 payment settled successfully.')
  }

  return (
    <section className="payments-offer">
      <div className="hero">
        <div>
          <h2>Payment Operations</h2>
          <p>This UI is running from the independent offer-payments repository.</p>
        </div>
        <button className="notify" onClick={notify}>Simulate payment</button>
      </div>

      <div className="stats">
        <div className="stat"><span>Processed today</span><strong>{count.toLocaleString()}</strong></div>
        <div className="stat"><span>Settlement value</span><strong>₹18.7L</strong></div>
        <div className="stat"><span>Success rate</span><strong>98.8%</strong></div>
      </div>

      <div className="panel">
        <h3>Recent transactions</h3>
        <table>
          <thead><tr><th>Reference</th><th>Method</th><th>Amount</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>PAY-482901</td><td>UPI</td><td>₹4,850</td><td className="ok">Settled</td></tr>
            <tr><td>PAY-482900</td><td>Card</td><td>₹12,420</td><td className="ok">Settled</td></tr>
            <tr><td>PAY-482899</td><td>Netbanking</td><td>₹7,200</td><td className="pending">Pending</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

const definition = {
  contractVersion: 1,
  config,
  mount({ element, host }) {
    if (!element) throw new Error('Payments offer requires a mount element.')
    ensureStyle()
    const root = createRoot(element)
    root.render(<PaymentsApp host={host} />)

    return {
      update() {},
      unmount() {
        root.unmount()
      },
    }
  },
}

window.__REMOTE_OFFERS__ = window.__REMOTE_OFFERS__ || {}
window.__REMOTE_OFFERS__[config.id] = definition
