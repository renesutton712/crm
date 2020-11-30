<?php

namespace App\Http\Networks;

class DefaultNetwork extends NetworkFactory {

    /**
     * @param $unique_id
     * @param $camp_id
     * @return false|string
     */
    public function saveLead($unique_id, $camp_id) {
        $this->updateToLead($unique_id);
        $response = ['status' => true, 'msg' => 'https://www.google.com'];
        $iframe = $this->getIframePixel($camp_id);
        if (!empty($iframe)) {
            $response['pixel'] = $iframe->iframe_content;
        }
        return json_encode($response);
    }

}