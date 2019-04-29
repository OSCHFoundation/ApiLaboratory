import React from 'react';
import {connect} from 'react-redux';

export default function Introduction() {
  return <div className="Introduction">
    <div className="so-back">
      <div className="so-chunk">
        <div className="Introduction__container">
          <h2>OSChain实验室</h2>
          <p className="Introduction__lead">OSChain实验室是一个能帮助人们学习和认识OSChain网络的工具，实验室可以 <a href="#txbuilder">构建事务</a>, <a href="#txsigner">签名事务</a>, 并<a href="#explorer?resource=transactions&endpoint=create">提交他们到网络上</a>。它也<a href="#explorer">发起各种查询请求到任何coast节点上</a>。</p>
        </div>
      </div>
    </div>
  </div>
}

