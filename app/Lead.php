<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Lead extends Model {

    protected $guarded = [];

    public function network() {
        return $this->belongsTo('App\Network');
    }

    public function offer() {
        return $this->belongsTo('App\Offer');
    }

    public function campaign() {
        return $this->belongsTo('App\Campaign');
    }

    public function rotator() {
        return $this->hasOne('App\Rotator');
    }

    public function countries() {
        return $this->hasOne('App\Country');
    }

    public static function leadsWithAllRelations($filters = []) {
        return DB::select(
            "select l.unique_id,
                       l.campaign_id,
                       l.rotator_id,
                       l.country,
                       l.first_name,
                       l.last_name,
                       l.email,
                       l.prefix,
                       l.phone,
                       l.ip,
                       l.ua,
                       l.status,
                       l.url_params,
                       l.network_response,
                       l.created_at,
                       l.updated_at,
                       c.campaign_name,
                       ro.rotator_name,
                       n.network_name,
                       n.id as network_id,
                       o.offer_id
                from leads l
                         left join rotators ro on l.rotator_id = ro.id
                         join campaigns c on l.campaign_id = c.id
                         left join offers o on l.offer_id = o.offer_id
                         left join networks n on l.network_id = n.id
                WHERE (nullif(:campaign_id, '') is null or l.campaign_id = :campaign_id_2)
                      AND (nullif(:network_id, '') is null or l.network_id = :network_id_2)
                      AND (nullif(:rotator_id, '') is null or l.rotator_id = :rotator_id_2)
                      AND (nullif(:country, '') is null or l.country = :country_2)
                      AND (nullif(:type, '') is null or l.status = :type_2)
                      AND (nullif(:start_date, '') is null or l.updated_at >= :start_date_2)
                      AND (nullif(:end_date, '') is null or l.updated_at <= :end_date_2)
                order by l.id DESC",
            [
                "campaign_id" => $filters['campaign_id'], "campaign_id_2" => $filters['campaign_id'],
                'network_id' => $filters['network_id'], 'network_id_2' => $filters['network_id'],
                'rotator_id' => $filters['rotator_id'], 'rotator_id_2' => $filters['rotator_id'],
                'country' => $filters['country_id'], 'country_2' => $filters['country_id'],
                'type' => $filters['type'], 'type_2' => $filters['type'],
                'start_date' => $filters['start_date'], 'start_date_2' => $filters['start_date'],
                'end_date' => $filters['end_date'], 'end_date_2' => $filters['end_date']
            ]
        );
    }

}
