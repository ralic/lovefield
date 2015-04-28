/**
 * @license
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
goog.provide('lf.query.Context');

goog.require('goog.asserts');
goog.require('goog.structs.Map');



/**
 * Base context for all query types.
 * @constructor
 */
lf.query.Context = function() {
  /**
   * A map used for locating predicates by ID. Instantiated lazily.
   * @private {?goog.structs.Map<number, !lf.Predicate>}
   */
  this.predicateMap_ = null;

  /** @type {!lf.Predicate} */
  this.where;
};


/**
 * @param {number} id
 * @return {!lf.Predicate}
 */
lf.query.Context.prototype.getPredicate = function(id) {
  if (goog.isNull(this.predicateMap_) && goog.isDefAndNotNull(this.where)) {
    this.predicateMap_ = lf.query.Context.buildPredicateMap_(
        /** @type {!lf.pred.PredicateNode} */ (this.where));
  }

  var predicate = this.predicateMap_.get(id, null);
  goog.asserts.assert(!goog.isNull(predicate));
  return predicate;
};


/**
 * Creates predicateMap such that predicates can be located by ID.
 * @param {!lf.pred.PredicateNode} rootPredicate The root of the predicate tree.
 * @return {!goog.structs.Map<number, !lf.Predicate>}
 * @private
 */
lf.query.Context.buildPredicateMap_ = function(rootPredicate) {
  var predicateMap = new goog.structs.Map();
  rootPredicate.traverse(function(node) {
    predicateMap.set(node.getId(), /** @type {!lf.Predicate} */ (node));
  });
  return predicateMap;
};


/** @return {!lf.query.Context} */
lf.query.Context.prototype.clone = goog.abstractMethod;


/**
 * @param {!lf.query.Context} context
 * @protected
 */
lf.query.Context.prototype.cloneBase = function(context) {
  if (context.where) {
    this.where = context.where.copy();
  }
};