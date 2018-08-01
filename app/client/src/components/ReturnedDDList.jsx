import React, { Fragment } from 'react'
import moment from 'moment'

function extractAdvice(item) {
  const ARUDD = item.BACSDocument.Data.ARUDD
  const record = ARUDD.Advice.OriginatingAccountRecords.OriginatingAccountRecord
  return {
    account: record.OriginatingAccount,
    returns: record.ReturnedDebitItem
  }
}

const ReturnedDDList = ({ items }) => {
  return (
    <div className="returned-dd-list">
      <h2>Returned Direct Debits</h2>
      {items.length === 0 ? (
        <p>
          Select a file or upload a new file by dropping on the "Drop new file"
          target
        </p>
      ) : (
        ''
      )}
      {items.map(item => {
        const advice = extractAdvice(item)
        return (
          <Fragment key={item._id}>
            <h3>{advice.account.name}</h3>
            <table>
              <thead>
                <tr>
                  <td className="name">Name</td>
                  <td className="sort-code">Sort Code</td>
                  <td className="number">Account</td>
                  <td className="reference">Reference</td>
                  <td className="return-desc">Return Desc</td>
                  <td className="amount">Amount</td>
                </tr>
              </thead>
              <tbody>
                {advice.returns.map(aReturn => (
                  <tr key={`${item._id}-${aReturn.PayerAccount.ref}`}>
                    <td className="name">{aReturn.PayerAccount.name}</td>
                    <td className="sort-code">
                      {aReturn.PayerAccount.sortCode}
                    </td>
                    <td className="number">{aReturn.PayerAccount.number}</td>
                    <td className="reference">{aReturn.PayerAccount.ref}</td>
                    <td className="return-desc">{aReturn.returnDescription}</td>
                    <td className="amount">
                      {aReturn.valueOf[0]} {aReturn.currency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>Processed {moment(item.date).calendar()}</p>
          </Fragment>
        )
      })}
    </div>
  )
}

export default ReturnedDDList
